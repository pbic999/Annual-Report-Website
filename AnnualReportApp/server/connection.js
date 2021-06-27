import mongoose from 'mongoose'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'

let gfs
const mongo_url = "mongodb://localhost:27017/intern_project?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((res)=> {
    console.log('connected to db')
    gfs= Grid(res.connection.db, mongoose.mongo)
    gfs.collection('images')
})


const storage = new GridFsStorage({
    url: mongo_url,
    file: (req, file)=> {
        return new Promise((resolve,reject)=>{
            const filename = `image-${Date.now()}-${file.originalname}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo);
        })
    }
})

export {gfs,storage}