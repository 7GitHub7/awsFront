var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    // let path = path.join(__dirname + '/index.html')
    // console.log(__dirnam)
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(80);