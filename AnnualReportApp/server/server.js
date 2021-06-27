import express from 'express'
import './connection.js'
import imageRouter from './routers/images_router.js'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/auth_router.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req,res)=> {
    res.send('Hello')
})

app.use('/user',userRouter)

app.use('/images',imageRouter)

app.use('/auth',authRouter) 

app.listen(319,()=> {
    console.log('Server listening at port no. 319');
})