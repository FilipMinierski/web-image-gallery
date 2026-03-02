import json
import os
import shutil


class Video:
    SUPPORTED_FORMATS = ["mp4", "webm"]

    def __init__(self):
        self.id = -1
        self.filename = "MISSING FILENAME"
        self.tags = []
        self.type = "video"
        self.score = 0

    def init_from_json(self, json_obj: dict) -> None:
        self.id = json_obj.get("id")
        self.filename = json_obj.get("filename")
        self.tags = json_obj.get("tags")
        self.type = json_obj.get("type")
        self.score = json_obj.get("score")

    def is_match(self, tags: list[str], allow_unprocessed: bool) -> bool:
        if not allow_unprocessed and "unprocessed" in self.tags:
            return False

        for tag in tags:
            if tag.startswith("-"):
                if tag[1:] in self.tags:
                    return False

            elif tag not in self.tags:
                return False

        return True

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "filename": self.filename,
            "tags": self.tags,
            "type": self.type,
            "score": self.score
        }

    def __str__(self):
        return f"({self.type}, filename={self.filename})"


class VideoDataBase:
    VDB_PATH = os.path.join("webapp", "db")
    VIDEO_PATH = os.path.join("webapp", "db", "videos")
    IMAGE_PATH = os.path.join("webapp", "db", "images")

    def __init__(self, db_filename="db.json"):
        self.hasLoaded = False
        self.videos = []
        self.queried = []
        self.query = "-1"
        self.db_filename = db_filename

    def add_video(self, video: Video):
        self.videos.append(video)

    def search(self, query: str) -> list[dict]:
        if query == self.query:
            return self.queried

        self.query = query
        self.queried = []

        tokens = query.split()
        tags = []

        for tok in tokens:
            if ":" in tok:
                # TODO: implement this
                pass
            else:
                tags.append(tok)

        allow_unprocessed = "unprocessed" in tags
        for video in self.videos:
            if video.is_match(tags, True):  # allow_unprocessed):
                self.queried.append(video.to_dict())

        return self.queried

    """If a video with the provided id exists, returns it. Else returns None."""
    def find_by_id(self, video_id: str) -> Video | None:
        for video in self.videos:
            if video.id == video_id:
                return video
        return None

    def load(self):
        if self.hasLoaded:
            return

        self.videos.clear()

        db_path = os.path.join(self.VDB_PATH, "db.json")
        with open(db_path, "r") as file:
            vdb_data = json.load(file)

        for video_data in vdb_data:
            video = Video()
            video.init_from_json(video_data)
            self.videos.append(video)

        print(f"VideoDataBase has loaded {len(self.videos)} videos from file.")
        self.hasLoaded = True

    def save(self):
        # Backups
        db_path = os.path.join(self.VDB_PATH, self.db_filename)
        #backup_path_1 = os.path.join(self.VDB_PATH, f"backup1-{self.db_filename}")
        #backup_path_2 = os.path.join(self.VDB_PATH, f"backup2-{self.db_filename}")
        #backup_path_3 = os.path.join(self.VDB_PATH, f"backup3-{self.db_filename}")

        #shutil.copyfile(backup_path_2, backup_path_3)
        #shutil.copyfile(backup_path_1, backup_path_2)
        #shutil.copyfile(db_path, backup_path_1)

        # Write to db
        json_videos = [v.__dict__ for v in self.videos]
        with open(db_path, "w") as file:
            json.dump(json_videos, file, indent=4)


vdb = VideoDataBase()
