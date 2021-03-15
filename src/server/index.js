var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var axios = require('axios')


var key = "47280a532c0b7407cb8c9a95ed2432df" //later to .env

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/analyse/:article_url', function (req, res) {
    article_url = req.params.article_url
    request_url = `https://api.meaningcloud.com/class-2.0?key=${key}&url=${req.params.article_url}&model=IPTC_en`
    axios.get(request_url)
        .then(response => {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(error => {
            console.log(error);
        });

    console.log(`Requested article url: ${article_url}`)
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
