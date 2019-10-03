const express = require('express')
const app = express()
var path = require('path')

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'index.html');
});
// Router added for sitemap potential.

app.listen(process.env.port || 3000);
console.log('BEST BOY TANK LISTENING ON PORT 3000');
