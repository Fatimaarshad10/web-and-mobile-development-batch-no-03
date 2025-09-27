import express from 'express'
import userRouter from './routes/userRoutes'
const app = express()

const student = [{
    id : 1,
    name : 'zainab',
    age : 23,
    email : 'zainab@gmail.com',
    address : 'saylani' 
} , {
    id : 2,
    name : 'aleena',
    age : 23,
    email : 'aleena@gmail.com',
    address : 'saylani' 
} ]


// middle ware
app.use(express.json()); 
app.use('/new/user' ,userRouter)




app.get('/user', (req,res) => {
  console.log("user data")
  res.json({ username : student[0].name , email :  student[1].email})
})
app.get('/product', (req,res) => {
  console.log(" product data")
   res.json("hello product")
})

app.post('/user' , (req , res)=>{
    const data = req.body
    student.push(data)
    res.json(student)
})


app.listen('4001', () => {
    console.log("Server is running on this port no 4000")
})
