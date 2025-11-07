import express from 'express'
import dotenv  from "dotenv"
import mongoose from 'mongoose';
import userRouter from './router/userRoute.js';
import cors from 'cors'
dotenv.config()

const app = express()


// middle ware
app.use(express.json()); 
app.use(cors())

app.use('/user',  userRouter)

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen('4001', () => {
    console.log("Server is running on this port no 4001")
})

