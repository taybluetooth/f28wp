const express = require('express')
const app = express()
const port = 3000

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use(express.static('src/static'))

app.get('/', (req, res) => res.render('base.njk'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
