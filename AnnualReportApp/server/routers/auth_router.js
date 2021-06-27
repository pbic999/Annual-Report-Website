import express from 'express'
import userModel from '../models/user.js'

const authRouter = express.Router()

authRouter.post('/signin', async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email,password})
        if(user) {
            res.send(user) 
        }
        else {
            res.status(404).send('Invalid credentials')
        }
    }
    catch (err) {
        res.status(500).send('err')
    }
})

authRouter.post('/google/signin', async (req,res) => {
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(user) {
            res.send(user) 
        }
        else {
            res.status(404).send('Invalid credentials')
        }
    }
    catch (err) {
        res.status(500).send('err')
    }
})

authRouter.post('/signup', async (req,res) => {
    try {
        const {name,email,password} = req.body
        const user = await userModel.findOne({email})
        if(user) {
            res.status(404).send('Email already in use')
        }
        else {
            const newUser = new userModel({email,password,name})
            await newUser.save()
            res.send(newUser)
        }
    }
    catch (err) {
        res.status(500).send('err')
        console.log(err);
    }
})

authRouter.post('/update', async (req,res) => {
    try {
        const {email,...info} = req.body
        const user = await userModel.findOneAndUpdate({email},{$set:{...info,email}})
        res.send('updated successfully')
    }
    catch (err) {
        res.status(500).send('err')
        console.log(err);
    }
})

export default authRouter

