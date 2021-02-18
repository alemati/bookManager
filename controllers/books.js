const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', async (req, res) => {
    const books = await Book.find()
    res.json(books)
})

booksRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.title === "" || body.author === '' || body.description === '' ||
        body.title === null || body.author === null || body.description === null) {
        return response.status(401).json({ error: 'not all info was provided' })
    }
    const newBook = new Book({
        title: body.title,
        author: body.author,
        description: body.description,
    })
    const bookFromDB = await newBook.save()
    response.json(bookFromDB.toJSON())
})

booksRouter.get("/:id", async (request, response, next) => {
    const bookFromDB = await Book.findById(request.params.id)
    response.json(bookFromDB.toJSON())
})

booksRouter.put("/:id", async (request, response, next) => {
    const updatedBookFromDB = await Book
        .findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(updatedBookFromDB.toJSON())
})

booksRouter.delete('/:id', async (request, response, next) => {
    await Book.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = booksRouter
