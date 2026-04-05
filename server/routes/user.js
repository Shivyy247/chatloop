import express from "express"

const app = express.Router();

app.get("/", (req, res) => {
    res.send("hello shivi");
});

export default app