import cors from "cors"
import mongoose from 'mongoose'
import express from 'express'
import users from "./route/api/users.js"
import passport from './config/passport.js'
import os from 'os'
// import path from 'path'

const app = express();
// const path = path();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static("dist"))
app.use(passport.initialize());

const CONNECTTION_URI = "mongodb+srv://admin:admin@cluster0.vyofr.mongodb.net/mern-authication?retryWrites=true&w=majority"
const PORT = 5000;

mongoose.connect(CONNECTTION_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() => console.log("DB is connected")).catch(err => console.log(err))



app.use('/api/users', users)
app.get('/api/getUsername', (req, res) => {
    res.send({username: os.userInfo().username})
})
app.listen(PORT, () => console.log(`Run on ${PORT}`)) 