import mongoose from 'mongoose'

const conferenceOrganizedSchema = mongoose.Schema({
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

const conferenceOrganizedModel = mongoose.model('conference_organized',conferenceOrganizedSchema)
export default conferenceOrganizedModel