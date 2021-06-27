import mongoose from 'mongoose'

const projectsSchema = mongoose.Schema({
    email: String,
    name: String,
    project_type: String,
    funding_from:String,
    start_date: Number,
    end_date: Number,
    sanctioned_amount: String,
    co_pi: String,
    start: String,
    end: String,
    dept: String,
    sorting_no: Number
})

const projectsModel = mongoose.model('project',projectsSchema)
export default projectsModel