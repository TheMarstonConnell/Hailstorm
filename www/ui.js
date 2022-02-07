
function makeBlock(data) {

    const container = document.createElement("div");
    container.classList.add('playlist_block');

    const title = document.createElement("a");
    title.classList.add('playlist_title');
    title.classList.add('playlist_text');
    title.innerText = data.title;

    const artist = document.createElement("a");
    artist.classList.add('playlist_artist');
    artist.classList.add('playlist_text');
    artist.innerText = data.artist.name;

    const cover = document.createElement("img");
    cover.classList.add('playlist_cover');

    if(data.cover_big){
        cover.src = data.cover_big;
    }else{
        cover.src = "https://e-cdns-images.dzcdn.net/images/playlist/d41d8cd98f00b204e9800998ecf8427e/200x200-000000-80-0-0.jpg";    
    }

    container.appendChild(cover);
    container.appendChild(title);
    container.appendChild(artist);

    container.dataset.timeadded = data.time_add;

    container.addEventListener("click", () => {

        if(data.isPlaylist) {
            DZ.player.playPlaylist(data.id);
        }else{
            DZ.player.playAlbum(data.id);
        }
        DZ.player.play();
    });


    return container;
}