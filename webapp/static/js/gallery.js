
var config = {
    galleryColumns: 5,
    galleryVideos: 50
};


function fetchConfig()
{
    fetch(window.origin + "/settings/config", {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        config = data;
    });
}


class VPlayer extends VComponent
{
    /**
     * @param {Video} video 
     */
    constructor(video)
    {
        super(null);

        if (video instanceof Video) 
        {
            this.root = Vanilla.createElement({
                tag: "div",
                className: "video-player",
                //id: "player_" + video.id
            });

            const videoElement = Vanilla.createElement({
                tag: "video",
                //id: "video_" + video.id,
                parent: this.root
            });
            videoElement.controls = true;
            videoElement.muted = true;
            videoElement.loop = true;

            const sourceElement = Vanilla.createElement({
                tag: "source",
                parent: videoElement
            });
            sourceElement.src = "/static/videos/" + video.filename;
            sourceElement.type = video.filename.endsWith(".mp4") ? "video/mp4" : "video/webm"

            const buttonContainer = Vanilla.createElement({
                tag: "div",
                className: "video-button-container",
                parent: this.root
            });
/*
            Vanilla.createElement({
                tag: "div",
                innerHTML: "Watch"
            });

            Vanilla.createElement({
                tag: "div",
                innerHTML: "Edit"
            });
*/
            this.video = video;
        }
        else 
        {
            this.video = null;
        }
    }
}


class Gallery
{
    constructor(videoContainerElement) 
    {
        this.videoContainerElement = videoContainerElement;
        this.videos = [];
        this.columns = [];
    }

    assignVideos(videoObjects)
    {
        this.videos = [];
        for (let i = 0; i < videoObjects.length; i++)
        {
            if (videoObjects[i].type == "video")
            {
                this.videos.push(new Video(videoObjects[i]));
            }
            else
            {
                this.videos.push(new Image(videoObjects[i]))
            }
        }
    }

    fetchPage()
    {
        fetch(window.origin + "/gallery/content", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            gallery.assignVideos(data);
            gallery.servePage();
        });
    }

    servePage()
    {
        const columnWidth = Math.round(100 / config.galleryColumns);

        for (let i = 0; i < config.galleryColumns; i++)
        {
            let column = Vanilla.createElement({
                tag: "div",
                id: "column" + i.toString(),
                className: "gallery-column",
                parent: this.videoContainerElement
            });
            column.style.maxWidth = (columnWidth - 1).toString() + "%";
            column.style.minWidth = (columnWidth - 2).toString() + "%";
            
            this.columns.push(column);
        }

        for (let i = 0; i < this.videos.length; i++)
        {
            if (this.videos[i].type == 0)
            {
                const player = new VPlayer(this.videos[i]);
                const postContainer = Vanilla.createElement({
                    tag: "div",
                    className: "post-container"
                });
                const href = Vanilla.createElement({
                    tag: "a"
                });
                href.href = "/watch?id=" + this.videos[i].id;

                href.appendChild(postContainer);
                postContainer.appendChild(player.root);
            
                let column = this.columns[i % this.columns.length];
                column.appendChild(href);
            }
            else
            {
                const postContainer = Vanilla.createElement({
                    tag: "div",
                    className: "post-container"
                });
                const href = Vanilla.createElement({
                    tag: "a"
                });
                href.href = "/watch?id=" + this.videos[i].id;
                const img = Vanilla.createElement({
                    tag: "img"                
                });
                
                img.src = "/static/images/" + this.videos[i].filename;
                let column = this.columns[i % this.columns.length];
                
                postContainer.appendChild(img);
                href.appendChild(postContainer);
                column.appendChild(href);
            }
        }
    }
}


fetchConfig();

const gallery = new Gallery(document.getElementById("videoContainer"));
gallery.fetchPage();
