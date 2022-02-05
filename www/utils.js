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