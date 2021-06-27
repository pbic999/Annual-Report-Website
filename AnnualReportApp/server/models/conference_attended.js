import mongoose from 'mongoose'

const conferenceAttendedSchema = mongoose.Schema({
    email: String,
    name: String,
    title: String,
    venue:String,
    start_date: Number,
    end_date: Number,
    funding_from: String,
    funding_amount: String,
    start: String,
    end: String,
    dept: String,
    sorting_no: Number
})

const conferenceAttendedModel = mongoose.model('conference_attended',conferenceAttendedSchema)
export default conferenceAttendedModel