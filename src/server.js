const express = require('express')
const app = express()
var path = require('path')

<<<<<<< HEAD
app.use(express.static(__dirname + '/public'));
=======
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use(express.static('src/static'))

app.get('/', (req, res) => res.render('base.njk'))
>>>>>>> 063b0a702228ce0d6b5068b0c316c5d113060f10

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'index.html');
});
// Router added for sitemap potential.

app.listen(process.env.port || 3000);
console.log('BEST BOY TANK LISTENING ON PORT 3000');
