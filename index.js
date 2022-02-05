const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 9999;

let access_token = "";

function main() {

    app.use(express.static('www'));

    app.get('/access_code', (req, res) => {
        res.status(200).send(access_token);
    });
    
    app.get('/auth', (req, res) => {
    

        let code = req.query.code;

        let secret = "94df8509ed8bd1f4335848d5b90d36ad";
        let appID = "516162";


        let url = `https://connect.deezer.com/oauth/access_token.php?app_id=${appID}&secret=${secret}&code=${code}`

        axios.get(url).then((r) => {

            let access = r.data.substring(
                r.data.indexOf("=") + 1, 
                r.data.lastIndexOf("&")
            );

            access_token = access;
        });


        res.redirect('/close.html');
    
    
    });
    
    app.listen(port, () => {
      console.log(`Altui app listening on port ${port}`);
    });
}

main();


