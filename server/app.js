import "dotenv/config";
import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;


connectDB(mongoURI);

app.use("/user", userRoute);


app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
