import express from 'express'
import multer from 'multer'
import {gfs,storage} from '../connection.js'

const imageRouter = express.Router();
const upload = multer({storage});

imageRouter.post('/upload',upload.single("file"),async (req,res) => {
    try{
    res.status(201).send(req.file)
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
})

imageRouter.get('/retrieve', async (req,res) =>{
    try{
    const data=await gfs.files.findOne({filename: req.query.name})
    if(!data || data.length ===0) res.send('Sorry, no such file found')
    else {
        const img = gfs.createReadStream(data.filename)
        img.pipe(res)
    }
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
})

export default imageRouter