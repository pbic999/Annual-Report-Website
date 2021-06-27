import mongoose from 'mongoose'

const conferencePresentationSchema = mongoose.Schema({
    email: String,
    name: String,
    title: String,
    venue:String,
    start_date: Number,
    end_date: Number,
    funding_from: String,
    funding_amount: String,
    paper_title: String,
    other_author: String,
    proceeding_name: String,
    volume: String,
    issue: String,
    pp: String,
    start: String,
    end: String,
    dept: String,
    sorting_no: Number
})

const conferencePresentationModel = mongoose.model('conference_presentation',conferencePresentationSchema)
export default conferencePresentationModel