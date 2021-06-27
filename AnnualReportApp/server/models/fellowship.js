import mongoose from 'mongoose'

const fellowshipSchema = mongoose.Schema({
    email: String,
    name: String,
    fellowship_name: String,
    fellowship_academics:String,
    timestamp: Number,
    date: String,
    dept: String,
    sorting_no: Number
})

const fellowshipModel = mongoose.model('fellowship',fellowshipSchema)
export default fellowshipModel