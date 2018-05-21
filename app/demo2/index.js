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

var port = 8080;
var port2 = 8081;

const app = new express();
app.use('/', express.static(path.join(__dirname, 'assets')));

spdy.createServer(options, app).listen(port2, () => {
    console.log(`http2 Server is listening on https://localhost:8081/`);
});
http.createServer(app).listen(port, () => {
    console.log(`http Server is listening on http://localhost:8080/`);
});
// app.get('/', (req, res) => {
//     var a = fs.readFileSync('./app/demo2/assets/h2_demo.html', { encoding: 'utf8' });
//     res.send(a);
// });
console.log('Application listening on port ' + port + ', https on port ' + port2 + '.');

