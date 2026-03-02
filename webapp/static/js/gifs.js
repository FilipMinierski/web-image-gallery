
class Gallery
{
    static PAGE_VIDEOS = 50;

    constructor(videoContainerElement) 
    {
        this.videoContainerElement = videoContainerElement;
        this.videos = [];
    }

    assignVideos(videoObjects)
    {
        this.videos = [];
        for (let i = 0; i < videoObjects.length; i++)
        {
            this.videos.push(new Video(videoObjects[i]));
        }
    }

    fetchPage()
    {
        fetch(window.origin + "/gifs/content", {
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
        const path = "/static/thumbnails/";

        for (let i = 0; i < this.videos.length; i++)
        {
            const video = this.videos[i];

            /*const link = Vanilla.createElement({
                tag: "a",
                className: "no-border",
                id: "link" + i.toString(),
                parent: this.videoContainerElement
            });
            link.href = "/video?id=" + video.id;*/

            const container = Vanilla.createElement({
                tag: "div",
                className: "video-preview-container no-border",
                parent: this.videoContainerElement
            });

            const video_element = Vanilla.createElement({
                tag: "video",
                className: "",
                parent: container
            });
            video_element.controls = true;
            video_element.autoplay = false;
            video_element.muted = true;
            

            const title = Vanilla.createElement({
                tag: "p",
                innerHTML: video.title,
                parent: container
            });
        }
    }
}
