import express from 'express'
import abroadVisitModel from '../models/abroad_visit.js'
import awardAndHonoursModel from '../models/award_and_honours.js'
import bookModel from '../models/books.js'
import conferenceOrganizedModel from '../models/coference_organized.js'
import conferenceAttendedModel from '../models/conference_attended.js'
import conferencePresentationModel from '../models/conference_presentation.js'
import fellowshipModel from '../models/fellowship.js'
import projectsModel from '../models/projects.js'
import publicationModel from '../models/publication.js'
import specialLectureModel from '../models/special_lecture.js'
import visitorToDepartmentModel from '../models/visitor_to_department.js'

const userRouter = express.Router()

//Add new data
userRouter.post('/upload/data/abroad_visit', async (req,res)=> {
    try{
        const body = req.body
        const start_date = new Date(body.start).getTime()
        const end_date = new Date(body.end).getTime()
        const newData = new abroadVisitModel({...body,start_date,end_date})

        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/award_and_honours', async (req,res)=> {
    try{
        const body = req.body
        const newData = new awardAndHonoursModel(body)
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/books', async (req,res)=> {
    try{
        const body = req.body
        const newData = new bookModel (body)
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/conference_organized', async (req,res)=> {
    try{
        const body = req.body
        const start_date = new Date(body.start).getTime()
        const end_date = new Date(body.end).getTime()
        const newData = new conferenceOrganizedModel({...body,start_date,end_date})
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/conference_attended', async (req,res)=> {
    try{
        const body = req.body
        const start_date = new Date(body.start).getTime()
        const end_date = new Date(body.end).getTime()
        const newData = new conferenceAttendedModel({...body,start_date,end_date})
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/conference_presentation', async (req,res)=> {
    try{
        const body = req.body
        const start_date = new Date(body.start).getTime()
        const end_date = new Date(body.end).getTime()
        const newData = new conferencePresentationModel({...body,start_date,end_date})
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/fellowship', async (req,res)=> {
    try{
        const body = req.body
        const newData = new fellowshipModel(body)
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/projects', async (req,res)=> {
    try{
        const body = req.body
        const start_date = new Date(body.start).getTime()
        const end_date = new Date(body.end).getTime()
        const newData = new projectsModel({...body,start_date,end_date})
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/publications', async (req,res)=> {
    try{
        const body = req.body
        const newData = new publicationModel(body)
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/special_lecture', async (req,res)=> {
    try{
        const body = req.body
        const newData = new specialLectureModel(body)
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/upload/data/visitor_to_department', async (req,res)=> {
    try{
        const body = req.body
        const newData = new visitorToDepartmentModel(body)
        await newData.save()
        res.status(200).send('Uploaded successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})


 
//Update data

userRouter.post('/update/data/abroad_visit', async (req,res)=> {
    try{
        const data = req.body
        const start_date = new Date(data.start).getTime()
        const end_date = new Date(data.end).getTime()
        const check1 = await abroadVisitModel.findByIdAndUpdate(data._id,{$set: {...data,start_date,end_date}})
        res.status(200).send('Updated successfully')
        console.log(check1);
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/award_and_honours', async (req,res)=> {
    try{
        const data = req.body
        await awardAndHonoursModel.findByIdAndUpdate(data._id,{$set: {...data}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/books', async (req,res)=> {
    try{
        const data = req.body
        await bookModel.findByIdAndUpdate(data._id,{$set: {...data}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/conference_organized', async (req,res)=> {
    try{
        const data = req.body
        const start_date = new Date(data.start).getTime()
        const end_date = new Date(data.end).getTime()
        await conferenceOrganizedModel.findByIdAndUpdate(data._id,{$set: {...data,start_date,end_date}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/conference_attended', async (req,res)=> {
    try{
        const data = req.body
        const start_date = new Date(data.start).getTime()
        const end_date = new Date(data.end).getTime()
        await conferenceAttendedModel.findByIdAndUpdate(data._id,{$set: {...data,end_date,start_date}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/conference_presentation', async (req,res)=> {
    try{
        const data = req.body
        const start_date = new Date(data.start).getTime()
        const end_date = new Date(data.end).getTime()
        await conferencePresentationModel.findByIdAndUpdate(data._id,{$set: {...data,start_date,end_date}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/fellowship', async (req,res)=> {
    try{
        const data = req.body
        await fellowshipModel.findByIdAndUpdate(data._id,{$set: {...data}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/projects', async (req,res)=> {
    try{
        const data = req.body
        const start_date = new Date(data.start).getTime()
        const end_date = new Date(data.end).getTime()
        await projectsModel.findByIdAndUpdate(data._id,{$set: {...data,start_date,end_date}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/publications', async (req,res)=> {
    try{
        const data = req.body
        await publicationModel.findByIdAndUpdate(data._id,{$set: {...data}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/special_lecture', async (req,res)=> {
    try{
        const data = req.body
        await specialLectureModel.findByIdAndUpdate(data._id,{$set: {...data}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/update/data/visitor_to_department', async (req,res)=> {
    try{
        const data = req.body
        await visitorToDepartmentModel.findByIdAndUpdate(data._id,{$set: {...data}})
        res.status(200).send('Updated successfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})




//Get users data

userRouter.post('/get/data/abroad_visit', async (req,res)=> {
    try{
        const body = req.body
        const data = await abroadVisitModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/award_and_honours', async (req,res)=> {
    try{
        const body = req.body
        const data = await awardAndHonoursModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/books', async (req,res)=> {
    try{
        const body = req.body
        const data = await bookModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/conference_organized', async (req,res)=> {
    try{
        const body = req.body
        const data = await conferenceOrganizedModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/conference_attended', async (req,res)=> {
    try{
        const body = req.body
        const data = await conferenceAttendedModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/conference_presentation', async (req,res)=> {
    try{
        const body = req.body
        const data = await conferencePresentationModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/fellowship', async (req,res)=> {
    try{
        const body = req.body
        const data = await fellowshipModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/projects', async (req,res)=> {
    try{
        const body = req.body
        const data = await projectsModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/publications', async (req,res)=> {
    try{
        const body = req.body
        const data = await publicationModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/special_lecture', async (req,res)=> {
    try{
        const body = req.body
        const data = await specialLectureModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.post('/get/data/visitor_to_department', async (req,res)=> {
    try{
        const body = req.body
        const data = await visitorToDepartmentModel.find({email:body.email})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})



//delete

userRouter.delete('/delete/abroad_visit/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await abroadVisitModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/award_and_honours/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await awardAndHonoursModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/books/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await bookModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/conference_organized/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await conferenceOrganizedModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/conference_attended/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await conferenceAttendedModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/conference_presentation/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await conferencePresentationModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/fellowship/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await fellowshipModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/projects/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await projectsModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/publications/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await publicationModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/special_lecture/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await specialLectureModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.delete('/delete/visitor_to_department/:id', async (req,res)=> {
    try{
        const id = req.params.id
        const doc = await visitorToDepartmentModel.findById(id)
        doc.remove();
        res.status(204).send('deleted sucessfully')
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})



/////

userRouter.get('/get/data/abroad_visit/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await abroadVisitModel.find({end_date:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/award_and_honours/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await awardAndHonoursModel.find({timestamp:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/books/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await bookModel.find({timestamp:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/conference_organized/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await conferenceOrganizedModel.find({end_date:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/conference_attended/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await conferenceAttendedModel.find({end_date:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/conference_presentation/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await conferencePresentationModel.find({end_date:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/fellowship/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await fellowshipModel.find({timestamp:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/projects/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await projectsModel.find({end_date:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/publications/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await publicationModel.find({timestamp:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/special_lecture/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await specialLectureModel.find({timestamp:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

userRouter.get('/get/data/visitor_to_department/:start/:end', async (req,res)=> {
    try{
        const {start,end} = req.params
        const data = await visitorToDepartmentModel.find({timestamp:{$gte:start,$lte:end}})
        res.status(200).send(data)
    }
    catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

export default userRouter

