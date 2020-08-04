const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('Hi')
})

app.listen(port, () => {
  console.log('Running Server')
})