class Navbar 
{
    constructor(searchElement) 
    {
        this.searchElement = searchElement;
    }

    search() 
    {
        if (!Vanilla.isElement(this.searchElement)) 
        {
            return;
        }

        const query = this.searchElement.value.trim().replace(/\s+/g, "+");
        window.location.replace(window.origin + "/gallery?query=" + query + "&page=1")
    }
}


const navbar = new Navbar(document.getElementById("searchInput"));
navbar.searchElement.addEventListener("keydown", (e) => {
    const KEY_ENTER = 13;
    if (e.keyCode == KEY_ENTER)
    {
        navbar.search();
    }
});
navbar.searchElement.value = new URLSearchParams(document.location.search).get("query");

document.getElementById("searchButton").onclick = navbar.search;
