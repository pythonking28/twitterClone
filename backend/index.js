import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import dbConnection from './config/database.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import tweetRouter from './routes/tweetRoute.js';
import path from "path"

// env path configuration
dotenv.config({
    path: ".env"
})
// database connection
dbConnection();

const _dirname = path.resolve()


const app = express();

// middlewares

app.use(express.urlencoded({
    extended: true
}));
const corsConfiguration = {
    origin: 'https://twitterclone-5sng.onrender.com',
    credentials:true
}
app.use(cors(corsConfiguration))
app.use(express.json())
app.use(cookieParser())

//api

app.use('/api/v1/user',userRouter)
app.use('/api/v1/tweet',tweetRouter)

app.use(express.static(path.join(_dirname, "/frontend/twitter/build")))
app.get("*", (_,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "twitter", "build", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})