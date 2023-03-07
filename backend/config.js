const mongoose = require('mongoose');
// const Book = require("./bookModel");
// const data = require("./listofbooks.json");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected: ${conn.connection.host}`.cyan.underline);

    // checkIfExisting for duplicate
    // const checkIfExisting = await Book.find({
    //     title: {$in: data.map((book) => book.title)}
    // })

    // if(checkIfExisting.length > 0){
    //     console.log(`Already contains ${checkIfExisting.length} books.`)
    //     return;
    // }
    // Saving the data from json file to mongoDB database
    // for (const book of data) {
    //     const newBook = new Book({
    //       author: book.author,
    //       title: book.title,
    //       genre: book.genre,
    //     });
  
    //     await newBook.save();
    //     console.log(`${newBook.title} saved to database`);
    //   }

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
