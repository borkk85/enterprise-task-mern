const asyncHandler = require('express-async-handler')
const Book = require('./bookModel')


const getBooks = asyncHandler(async (req, res) =>
{   const books = await Book.find()

    if(books.length === 0){
        res.status(400)
        throw new Error("No book found")
    }
    
    res.status(200).json(books)
})

module.exports = {
    getBooks
}