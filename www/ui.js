
function makeBlock(data) {

    const container = document.createElement("div");
    container.classList.add('playlist_block');

    const title = document.createElement("a");
    title.classList.add('playlist_title');
    title.innerText = data.title;

    const artist = document.createElement("a");
    artist.classList.add('playlist_artist');
    artist.innerText = data.artist.name;

    const cover = document.createElement("img");
    cover.classList.add('playlist_cover');
    cover.src = data.cover_big;

    container.appendChild(cover);
    container.appendChild(title);
    container.appendChild(artist);

    container.addEventListener("click", () => {
        DZ.player.playAlbum(data.id);
        DZ.player.play();
    });


    return container;
}