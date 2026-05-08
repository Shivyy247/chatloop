import mongoose from "mongoose"
import jwt from 'jsonwebtoken'


const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "lax",
  httpOnly: true,
  secure: false,
};

const connectDB = (uri) => {
    mongoose
        .connect(uri, { dbname: "chatloop" })
        .then((data) =>
            console.log(`connected to DB: ${data.connection.host}`)
        )
        .catch((err) => {
            throw err;
        })
};

const sendToken = (res, user, code, message) => { 
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie("chattu-token", token, cookieOptions)
        .json({
        success: true,
        message,
    });
};

const emitEvent = (req,event,users,data) => {
    console.log("Emmiting Event!", event);
}

const uploadFilesToCloudinary = async (files = []) => {
    
}

const deleteFilesFromCloudinary = async (public_ids) => {
    //delete files from cloudinary
}

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};