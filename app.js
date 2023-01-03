const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { usersRouter } = require('./routes/users')
const { cardsRouter } = require('./routes/cards')
const { PORT = 3000 } = process.env
mongoose.connect('mongodb://localhost:27017/mestodb')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.user = {
    _id: '63af001480819306f7473d93',
  }

  next()
})
app.use('/', cardsRouter)
app.use('/', usersRouter)
app.listen(PORT)

