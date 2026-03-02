class Video
{
    constructor(videoObject)
    {
        this.id = videoObject.id;
        this.filename = videoObject.filename;
        this.tags = videoObject.tags;
        this.score = videoObject.score;
        this.type = 0;
    }
}


class Image
{
    constructor(imageObject)
    {
        this.id = imageObject.id;
        this.filename = imageObject.filename;
        this.tags = imageObject.tags;
        this.score = imageObject.score;
        this.type = 1;
    }
}
