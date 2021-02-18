require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const booksRouter = require('./controllers/books')
app.use('/api/books', booksRouter)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

let url = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'development') {
    url = process.env.DEV_MONGODB_URI
} 

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = app