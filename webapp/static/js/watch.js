function vote(scoreChange)
{
    var _id = new URLSearchParams(window.location.search).get("id");

    fetch(window.origin + "/updatescore", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {id: _id, change: scoreChange}
        )
    })
    .then(response => {
        response.json();

        if (response.status == 200)
        {
            console.log("Score of post " + _id.toString() + " changed by " + scoreChange.toString())
            const scoreDisplay = document.getElementById("scoreDisplay");
            const score = parseInt(scoreDisplay.innerHTML.split(" ")[0]);
            scoreDisplay.innerHTML = (score + scoreChange).toString() + " Likes";
        }
    })
    .then(data => {});
}



function createTagElements(tags)
{
    const container = Vanilla.createElement({
        tag: "div",
        className: "tag-container",
        id: "tagContainer"
    });
    container.innerHTML = "";

    for (let i = 0; i < tags.length; i++)
    {
        const tag = tags[i];

        link = Vanilla.createElement({
            tag: "a",
            parent: container
        });
        link.href = "http://127.0.0.1:5000/gallery?query=" + tag + "&page=1";

        tagDiv = Vanilla.createElement({
            tag: "div",
            className: "tag",
            parent: link
        });

        Vanilla.createElement({
            tag: "p",
            className: "no-margin",
            innerHTML: tag,
            parent: tagDiv
        });
    }

    document.getElementById("playerRoot").appendChild(container);
}


function loadContent(data)
{
    const postContainer = document.getElementById("playerRoot");

    if (data.type == "video")
    {
        const player = Vanilla.createElement({
            tag: "video"
        });
        player.autoplay = true;
        player.controls = true;
        player.muted = true;
        player.loop = true;
        player.style = "width: 40vw;";

        const player_source = Vanilla.createElement({
            tag: "source"
        });
        player_source.src = "/static/videos/" + data.filename;
        const tok = data.filename.split(".");
        player_source.type = "video/" + tok[tok.length - 1]

        player.appendChild(player_source);
        postContainer.appendChild(player);
    }
    else if (data.type == "image")
    {
        const img = Vanilla.createElement({
            tag: "img"                
        });
        img.style = "width: 40vw;";
        img.src = "/static/images/" + data.filename;
        
        postContainer.appendChild(img);
    }
    else console.log("Unexpected post type '" + data.type + "'")

    createTagElements(data.tags);

    const scoreContainer = Vanilla.createElement({
        tag: "div",
        className: "score-container"
    });

    const scoreDisplay = Vanilla.createElement({
        tag: "h3",
        className: "score",
        id: "scoreDisplay",
        innerHTML: data.score.toString() + " Likes"
    });

    const upVoteButton = Vanilla.createElement({
        tag: "button",
        className: "score",
        innerHTML: "+"
    });
    upVoteButton.onclick = () => {vote(1)};

    const downVoteButton = Vanilla.createElement({
        tag: "button",
        className: "score",
        innerHTML: "-"
    });
    downVoteButton.onclick = () =>  {vote(-1)};
    
    scoreContainer.appendChild(scoreDisplay);
    scoreContainer.appendChild(upVoteButton);
    scoreContainer.appendChild(downVoteButton);
    postContainer.appendChild(scoreContainer);
}


function fetchContent()
{
    var _id = new URLSearchParams(window.location.search).get("id");
    fetch(window.origin + "/getcontent?id=" + _id.toString(), {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        loadContent(data);
    });
}


fetchContent();
