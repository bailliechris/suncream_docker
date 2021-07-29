// Load ENV Details
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { default: axios } = require('axios');
const port = process.env.PORT || 5000;
const apiKey = process.env.WEATHERKEY;

// body-parser middleware
app.use(express.json()); // for parsing application/json
//app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// Config CORS options
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'static')))

app.post('/weatherupdate', (req, res) => {
    let loc = req.body.location;
    
    if (loc === undefined) {
        res.status(400).send("Undefined location sent.");
    }
    else {
        axios.get('https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + loc + '&aqi=no')
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
    
    }
});

// Add catch all else routes + redirect to /
app.use(function (req, res) {
    /*let url = parseurl(req).pathname;

    res.status(404).send("Sorry can't find " + url);

    console.log("Requested Path", url);*/

    res.redirect('/public/index.html');
});

// Start Server
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});