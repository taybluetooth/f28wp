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

app.listen(process.env.port || 3000);
console.log('BEST BOY TANK LISTENING ON PORT 3000');
