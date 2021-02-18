const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: 1,
        maxLength: 100
    },
    author: {
        type: String,
        minLength: 1,
        maxLength: 100
    },
    description: {
        type: String,
        minLength: 1,
        maxLength: 100
    },
})

bookSchema.plugin(uniqueValidator)

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Book', bookSchema)