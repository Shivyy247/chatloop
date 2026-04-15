import mongoose from "mongoose"


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
    const token = "123456";

    return res.status(code).cookie("chattu-token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
    })
        .json({
        success: true,
        token,
        message,
        user
    });
};

export { connectDB, sendToken };