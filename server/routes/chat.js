import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import {
    addMembers,
    deleteChat,
    getChatDetails,
    getMessages,
    getMyChats,
    getMyGroups,
    leaveMembers,
    newGroupChat,
    removeMembers,
    renameGroup,
    sendAttachments
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

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

app.post("/message", attachmentsMulter, sendAttachments);

// get message

app.get("/message/:id", getMessages);


// get chat details, rename, delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

// app.get("/chat/:id/", A);
// app.put("/chat/:id/", B);
// app.delete("/chat/:id/", C);


export default app;