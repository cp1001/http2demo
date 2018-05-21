const express = require('express');
var spdy = require('spdy');
var http = require('http');
var fs = require('fs');
const path = require('path');

console.log('__dirname:', __dirname);
var options = {
    key: fs.readFileSync('./app/keys/server-key.pem'),
    cert: fs.readFileSync('./app/keys/server-cert.pem')
}

var port = 8010;
var port2 = 8011;

const app = new express();
app.use('/', express.static(path.join(__dirname, 'assets')));

spdy.createServer(options, app).listen(port2, () => {
    console.log(`http2 Server is listening on https://localhost:8011/`);
});
http.createServer(app).listen(port, () => {
    console.log(`http Server is listening on http://localhost:8010/`);
});
// app.get('/', (req, res) => {
//     var a = fs.readFileSync('./app/demo2/assets/h2_demo.html', { encoding: 'utf8' });
//     res.send(a);
// });
app.get('/h1', (req, res) => {
    res.sendFile(path.join(__dirname, './assets/h1_demo.html'));
});
app.get('/h2', (req, res) => {
    res.sendFile(path.join(__dirname, './assets/h2_demo.html'));
});
console.log('Application listening on port ' + port + ', https on port ' + port2 + '.');

