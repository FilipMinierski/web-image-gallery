
function uploadFromUrl()
{
    document.getElementById("uploadMessage").innerHTML = "";
    fetch(window.origin + "/upload", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {video_url: document.getElementById("urlInput").value}
            )
        })
        .then(response => {
            response.json();

            if (response.status != 200)
            {
                document.getElementById("uploadMessage").innerHTML = "Failed to upload video";
            }
            else
            {
                document.getElementById("uploadMessage").innerHTML = "Successfully uploaded video";
            }
        })
        .then(data => {});
}


document.getElementById("uploadButton").onclick = uploadFromUrl;
