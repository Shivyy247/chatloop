import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import {
    addMembers,
    getMyChats,
    getMyGroups,
    leaveMembers,
    newGroupChat,
    removeMembers
} from "../controllers/chat.js";

const app = express.Router();


// after here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemembers", removeMembers);

app.delete("/levave/:id", leaveMembers);


// send attachments

// get message

// get chat details, rename, delete

export default app;