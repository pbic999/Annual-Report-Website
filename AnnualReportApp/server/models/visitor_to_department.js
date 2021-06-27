import mongoose from 'mongoose'

const visitorToDepartmentSchema = mongoose.Schema({
    email: String,
    name: String,
    designation: String,
    institute:String,
    timestamp: Number,
    purpose: String,
    topic: String,
    date: String,
    dept: String,
    sorting_no: Number
})

const visitorToDepartmentModel = mongoose.model('visitor_to_department',visitorToDepartmentSchema)
export default visitorToDepartmentModel