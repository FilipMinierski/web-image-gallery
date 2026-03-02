
function servePage(config)
{
    
}

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
        servePage(data);
    });
}


fetchConfig()
