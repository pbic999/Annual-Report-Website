import mongoose from 'mongoose'

const abroadVisitSchema = mongoose.Schema({
    email: String,
    name: String,
    visit_purpose: String,
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

const abroadVisitModel = mongoose.model('abroad_visit',abroadVisitSchema)
export default abroadVisitModel