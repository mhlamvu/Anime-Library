if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./public/index')

// Tell app what view engine we want to use
app.set('view engine', 'ejs')

// Tell app where to find the views
app.set('views', __dirname + '/views')

app.set('layout', './layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Mongoose connected'))

app.use(indexRouter)

app.listen(process.env.PORT || 5000)