const gifContainer = document.querySelector('.js-gif-display');
const searchForm = document.querySelector('#searchBox');
const searchBar = document.querySelector('#searchBar');
let gifs = null;

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

function getRandomBackgroundColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
}

function createGifInfo(gif) {
    let title = document.createElement('p');
    title.classList.add('cf', 'body', 'gif-info-text');
    title.style.textShadow = `1px 1px ${getRandomBackgroundColor()}`;
    console.log(getRandomBackgroundColor());
    title.innerHTML = `${gif.title ? gif.title : "(no title)"}`;
    let info = document.createElement('p');
    info.classList.add('ffx', 'info');
    info.innerHTML = `content rating: ${gif.rating}<br>uploaded by: <b>${gif.username ? gif.username : "(no username)"}</b><br>original dimensions: ${gif.images.original.width}x${gif.images.original.height}<br>imported on: ${gif.import_datetime}<br><a href="${gif.bitly_url}">view original on GIPHY</a>`;
    let output = document.createElement('div');
    output.classList.add('gif-info');
    output.appendChild(title);
    output.appendChild(info);
    return output;
}

function search() {
    let thisQuery = {
        q : searchBar.value,
        r : getRating(),
        o : false,
    };
    loadGifs(thisQuery);
}

function clearLoadedContent(element) {
    element.innerHTML = "";
}

async function loadGifs(query) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=w5p17kHyXSUJ5yL2gftyNNkDEyKBDm4g&q=${encodeURIComponent(query.q)}&limit=24&offset=${query.o ? "25" : "0"}${query.r ? "&rating=" + query.r : ""}&lang=en&bundle=clips_grid_picker`);
    gifs = await response.json();
    console.log(gifs.data);
    clearLoadedContent(gifContainer);
    for (let gif of gifs.data) {
        let output = document.createElement('div');
        output.innerHTML = `<img src="${gif.images.fixed_width.webp}" alt="${gif.alt_text}"></img>`;
        output.classList.add('js-gif','gif');
        let info = createGifInfo(gif);
        output.appendChild(info);
        gifContainer.appendChild(output);
    }
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    search();
})