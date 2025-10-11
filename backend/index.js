import express from 'express'
import dotenv  from "dotenv"
import mongoose from 'mongoose';
import userRouter from './router/userRoutes.js';
import productRouter from './router/productRoutes.js'
import cors from 'cors'
dotenv.config()


const app = express()


// middle ware
app.use(express.json());
app.use(cors())






app.use('/user',  userRouter)
app.use('/product',  productRouter)




// Router , Controller


// schema , model , object
const studentSchema = new mongoose.Schema (
    {
        name : String,
        age : {
            type : Number ,
            require : true
        },
        email : String


    }


)
const Student = mongoose.model('Student', studentSchema);


const productSchema = new mongoose.Schema (
    {
        product_name : String,
        description : String,
        price : Number


    }


)
const Product = mongoose.model('Product', productSchema);


app.post('/student' , (req, res)=>{
const { name , email , age} = req.body
const data = new Student({name , email , age}).save()
res.json(' Student is created')
})


app.post('/product' , (req, res)=>{
const {    product_name ,description ,price } = req.body
const data = new Product({product_name ,description ,price}).save()
res.json(' Product is created')
})

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


app.listen('4001', () => {
    console.log("Server is running on this port no 4000")
})




