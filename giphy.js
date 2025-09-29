const gifContainer = document.querySelector('.js-gif-display');
const searchForm = document.querySelector('#searchBox');
const searchBar = document.querySelector('#searchBar');
let content = null;

// Query object:
let exampleQuery = {
    q : "Sample text",
    r : null, //Null for none, otherwise 'g', 'pg', 'pg13', 'r'.
    o : false, //Random gif offset (if true)
}

function getRating() {
    if (document.querySelector('#dc').checked) return null;
    else {
        for (let rating of ['g','pg','pg13','r']) {
            if (document.querySelector(`#${rating}`).checked) {
                return rating;
            }
        }
    }
}

function search() {
    let thisQuery = {
        q : searchBar.value,
        r : getRating(),
        o : false,
    };
    console.log(`SEARCH QUERY: ${thisQuery}`);
    loadGifs(thisQuery);
}

function clearLoadedContent(element) {
    element.innerHTML = "";
}

async function loadGifs(query) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=w5p17kHyXSUJ5yL2gftyNNkDEyKBDm4g&q=${encodeURIComponent(query.q)}&limit=25&offset=${query.o ? "25" : "0"}${query.r ? "&rating=" + query.r : ""}&lang=en&bundle=clips_grid_picker`);
    let gifs = await response.json();
    console.log(gifs.data);
    clearLoadedContent(gifContainer);
    for (let gif of gifs.data) {
        let output = document.createElement('img');
        output.setAttribute('src', gif.images.fixed_width.webp);
        output.classList.add('isblock');
        gifContainer.appendChild(output);
    }
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    search();
})