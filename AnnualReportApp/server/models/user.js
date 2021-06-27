import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    qualification: String,
    gender: String,
    contact: String,
    designation: String,
    dept: String,
})

const userModel = mongoose.model('user',userSchema)
export default userModel