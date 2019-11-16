// var fs = require('fs');
var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('/etc/letsencrypt/live/tor.mowat.dev/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('/etc/letsencrypt/live/tor.mowat.dev/cert.pem', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

const express = require('express')
const app = express()
var path = require('path')

var uuid4 = require('uuid4')
const id = uuid4();
if(!uuid4.valid(id)) {
	console.log('[FAIL] UUID not created!');
}

var nunjucks = require('nunjucks')
nunjucks.configure(__dirname + '/views/');
// console.log(__dirname + '/views/');

app.get('/', function(req, res) {
  	nunjucks.render('index.html', { sessionId: id });
});

app.get('/get/session_id', (req, res) => {
	res.send(id);
});

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.http_port || 5000);
// httpsServer.listen(process.env.https_port || 443);
console.log('BEST BOY TANK LISTENING ON PORT 5000 or $http_port env var');
