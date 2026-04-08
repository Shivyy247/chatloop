import express from "express";
import userRoute from './routes/user.js'
import { connectDB } from "./utils/features.js";


const app = express();

connectDB("mongodb://localhost:27017/chatloop")

app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.send("hello world!")
})


app.listen(3000, () => {
    console.log("Server is running at port 3000");
})