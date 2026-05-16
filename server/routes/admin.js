import express from "express"
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from "../controllers/admin.js";
import { adminLoginvalidator, validateHandle } from "../lib/vlidators.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/verify",adminLoginvalidator(), validateHandle, adminLogin);
app.post("/logout", adminLogout);

//only admin can access these routes

app.use(adminOnly);
app.get("/", getAdminData);

app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);


app.get("/stats", getDashboardStats);


export default app;