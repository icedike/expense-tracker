const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/handlebars-helpers') }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log('Running Server')
})
