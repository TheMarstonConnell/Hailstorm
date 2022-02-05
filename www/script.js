function startApp() {
    DZ.getLoginStatus(function (response) {
        if (response.authResponse) {
            console.log(response);
        } else {
            // no user session available, someone you dont know
        }
    });
    console.log(DZ.player);

    getRecommended().then((resp) => {


        let data = resp.data;

        let total = resp.total;

        for (let index = 0; index < total; index++) {
            document.getElementById("container").appendChild(makeBlock(data[index]));
        }

        // document.getElementById("container").appendChild(makeBlock(data[1]));


    });

    
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
                container: 'player',
                playlist: false,
                width : 200,
                height : 200,
                autoplay:false,
                format : 'square',
                onload: function () {
                    startApp();
                }
            }
        });


    });

    DZ.ready(function (sdk_options) {
        console.log('DZ SDK is ready', sdk_options);

    });

    onClick("btn_play", () => {
        DZ.player.play();
        console.log("Playing!");
        console.log(DZ.player)
    });


}
