function getUser() {
    return new Promise((resolve, reject) => {
        DZ.api('/user/me', function (response) {    
            resolve(response);
        });
    });
}

function getUserID() {
    return new Promise((resolve , reject) => {
        getUser().then((response) => {
            resolve(response.id);
        });
    });
}

function getRecommended(type="albums") {
    return new Promise((resolve, reject) => {
        DZ.api('/user/me/recommendations/' + type, function (response) {    
            resolve(response);
        });
    });
}

function getPlaylistPage(func, index=0) {
    DZ.api(`/user/me/playlists?index=${index * 25}`, function (response) {    
        
        for (const b of response.data) {

            b.isPlaylist = true;
            
            b.artist = b.creator;
            b.cover_big = b.picture_big;
            console.log(b);

            func(b);
        }

        if(response.next) {
            getPlaylistPage(func, index += 1);
        }
    });
}

function getPlaylists(func) {
    getPlaylistPage(func, 0);
}

function getAlbumPage(func, index=0) {
    DZ.api(`/user/me/albums?index=${index * 25}`, function (response) {    
        
        for (const b of response.data) {
            func(b);
        }

        if(response.next) {
            getAlbumPage(func, index += 1);
        }
    });
}

function getAlbums(func) {
    getAlbumPage(func, 0);
}