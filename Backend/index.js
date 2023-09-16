import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { Login, Register, getCurrentUser } from './Controller/UserController.js'
import { Addquestion, allQuestion } from './Controller/AdminController.js'
import { isAmin } from './Middleware/Allmiddleware.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
dotenv.config()


app.get("/",(req , res )=>{
    res.send("WORKING")
})

app.post("/register",Register)
app.post("/login",Login)
app.post("/get-current-user",getCurrentUser)


app.post("/add-question", isAmin, Addquestion)
app.get("/all-qusetion", allQuestion )  //will show to both 



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to DB");
})

app.listen(8000,()=>{
    console.log("listening on port 8000");
})




