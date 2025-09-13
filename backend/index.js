import express from 'express'
const app = express()


app.get('/users' , (res,res)=>{
    res.json("Hello All users")
})


app.listen('4000', ()=>{
    console.log("Server is running on the port no 4000")
})