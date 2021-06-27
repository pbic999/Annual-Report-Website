import mongoose from 'mongoose'

const specialLectureSchema = mongoose.Schema({
    email: String,
    name: String,
    topic: String,
    institute:String,
    timestamp: Number,
    date: String,
    dept: String,
    sorting_no: Number
})

const specialLectureModel = mongoose.model('special_lecture',specialLectureSchema)
export default specialLectureModel