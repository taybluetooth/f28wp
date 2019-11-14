var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('../../keys/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('../../keys/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

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
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.http_port || 8000);
httpsServer.listen(process.env.https_port || 8443);
console.log('BEST BOY TANK LISTENING ON PORT 8000 & 8443');
