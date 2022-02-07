let currentPage = location.href;

function startApp() {
    DZ.getLoginStatus(function (response) {
        if (response.authResponse) {
            console.log(response);
        } else {
            // no user session available, someone you dont know
        }
    });
    console.log(DZ.player);

    loadView("recommended");

    document.getElementById("dzplayer").classList.add("blocking");
    let remove = function () {
        console.log("click!");
        document.getElementById("dzplayer").classList.remove("blocking");
        document.getElementById("dz-root").classList.remove("blocking");
    }


    window.focus()

    window.addEventListener("blur", () => {
    setTimeout(() => {
        if (document.activeElement.tagName === "IFRAME") {
            remove();
        }
    });
    }, { once: true });

    init_events();

    updateContent(location.href);
}

function init_events() {
    DZ.Event.subscribe('current_track', function(track, evt_name){
        document.title = track.track.title + " - " + track.track.artist.name;

        DZ.api('/album/' + track.track.album.id, function (response) {
            console.log(response);

            if(response.error) {
                document.getElementById("album_cover_img").src = "https://e-cdns-images.dzcdn.net/images/playlist/d41d8cd98f00b204e9800998ecf8427e/200x200-000000-80-0-0.jpg";
                return;
            }

            if(response.cover_big == null) {
                document.getElementById("album_cover_img").src = "https://e-cdns-images.dzcdn.net/images/playlist/d41d8cd98f00b204e9800998ecf8427e/200x200-000000-80-0-0.jpg";
                return;
            }

            document.getElementById("album_cover_img").src = response.cover_big;
        });
    });

    DZ.Event.subscribe('player_play', function(arg){
        let play = document.getElementById("play_button");
        play.classList.add("playing");
    });

    DZ.Event.subscribe('player_paused', function(arg){
        let play = document.getElementById("play_button");
        play.classList.remove("playing");
    });

    DZ.Event.subscribe('player_position', function(arg){
        let slider = document.getElementById("inner_slider_seek");
        slider.style.width = (100*arg[0]/arg[1]) + '%'
    });

    onClick("slider_seek", (evt) => {
        let left = evt.offsetX;

        DZ.player.seek((evt.offsetX / document.getElementById("slider_seek").offsetWidth) * 100);
    });

    onClick("back_button", (evt) => {
        DZ.player.prev();
    });

    onClick("skip_button", (evt) => {
        DZ.player.next();
    });

    onClick("play_button", (evt) => {
        let playing = DZ.player.isPlaying();
        console.log(playing);

        if(playing){
            DZ.player.pause();
            return;
        }
        DZ.player.play();
    });


    let currentPage = location.href;

    setInterval(function()
    {
        if (currentPage != location.href)
        {
            currentPage = location.href;
            updateContent(currentPage);
        }
    }, 50);

}

function place_block(b) {
    let block = makeBlock(b);

    let container = document.getElementById("container");
    if(container.firstChild == null){
        container.appendChild(block);
        return;
    }

    let next = container.firstChild.nextSibling;


    let item = container.firstChild;

    while(item.lastChild.innerHTML.toLowerCase() < block.lastChild.innerHTML.toLowerCase()) {
        item = item.nextSibling;
        if(item == null) {
            break;
        }
    }

    container.insertBefore(block, item);
    
    // let nodes = container.firstChild.lastChild.innerHTML;
    // console.log(nodes);



    
}

function loadView(view) {
    let parent = document.getElementById("container");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    switch (view) {

        case "albums":
            getAlbums((block) => {
                place_block(block);
            });
            break;
        case "playlists":
            getPlaylists((block) => {
                place_block(block);
            });
            break;
        default:
            getRecommended().then((resp) => {
                let data = resp.data;
        
                let total = resp.total;
        
                for (let index = 0; index < total; index++) {
                    place_block(data[index]);
                }
            });
            break;
    }
    
}

function updateContent(page) {
    let urlList = page.split("#");
    let p = urlList[1];
    loadView(p);
}


function log_in(callback) {
    DZ.login(function (r) {
        if (r.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            DZ.api('/user/me', function (response) {

                console.log('Good to see you, ' + response.name + '.');

                callback()


            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        perms: 'basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history'
    });
}

function onClick(id, func) {
    document.getElementById(id).addEventListener("click", func);
}

function load() {

    DZ.init({
        appId: '516162',
        channelUrl: 'http://localhost:9999/channel.html',
    });

    log_in(() => {
        DZ.init({
            appId: '516162',
            channelUrl: 'http://localhost:9999/channel.html',
            player: {
                autoplay:false,
                onload: function () {
                    startApp();
                }
            }
        });


    });

    DZ.ready(function (sdk_options) {
        console.log('DZ SDK is ready', sdk_options);

    });


}
