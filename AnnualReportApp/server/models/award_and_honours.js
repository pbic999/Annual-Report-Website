import mongoose from 'mongoose'

const awardAndHonoursSchema = mongoose.Schema({
    email: String,
    name: String,
    Award_or_honour: String,
    award_name:String,
    award_by: String,
    award_for: String,
    timestamp: Number,
    date: String,
    dept: String,
    sorting_no: Number
})

const awardAndHonoursModel = mongoose.model('award_and_honour',awardAndHonoursSchema)
export default awardAndHonoursModel