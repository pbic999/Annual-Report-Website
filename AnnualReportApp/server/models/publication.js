import mongoose from 'mongoose'

const publicationSchema = mongoose.Schema({
    email: String,
    name: String,
    author_position: String,
    other_authors: String,
    title: String,
    journal_name:String,
    volume: String,
    issue: String,
    timestamp: Number,
    pp: String,
    date: String,
    dept: String,
    sorting_no: Number
})

const publicationModel = mongoose.model('publication',publicationSchema)
export default publicationModel