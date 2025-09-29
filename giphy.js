const gifContainer = document.querySelector('.js-gif-display');
const searchBar = document.querySelector('#searchBox');
const ratingSelect = document.querySelector('#rating')
let content = null;

// Query object:
let exampleQuery = {
    q : "Sample text",
    r : null, //Null for none, otherwise 'g', 'pg', 'pg13', 'r'.
    o : false, //Random gif offset (if true)
}
function search(event) {
    event.preventDefault();
    loadGifs({
        q : searchBar.value,
    })
}

async function loadGifs(query) {
    console.log(`https://api.giphy.com/v1/gifs/search?api_key=w5p17kHyXSUJ5yL2gftyNNkDEyKBDm4g&q=${encodeURIComponent(query.q)}&limit=25&offset=${query.o ? "25" : "0"}${query.r ? "&rating=" + query.r : ""}&lang=en&bundle=clips_grid_picker`);
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=w5p17kHyXSUJ5yL2gftyNNkDEyKBDm4g&q=${encodeURIComponent(query.q)}&limit=25&offset=${query.o ? "25" : "0"}${query.r ? "&rating=" + query.r : ""}&lang=en&bundle=clips_grid_picker`);
    let gifs = await response.json();
    console.log(gifs.data);
}
loadGifs({q:"Minecraft creeper", r:null, o:true});