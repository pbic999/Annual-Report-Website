import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    email: String,
    name: String,
    author_position: String,
    other_authors: String,
    book_title: String,
    chapter_title:String,
    chapter_no:String,
    publisher: String,
    timestamp: Number,
    pp: String,
    date: String,
    dept: String,
    sorting_no: Number
})

const bookModel = mongoose.model('book',bookSchema)
export default bookModel