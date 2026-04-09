import "dotenv/config";
import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const app = express();

app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;


connectDB(mongoURI);

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
