import "dotenv/config";
import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";


import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "shivi";


connectDB(mongoURI);


app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);



app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
