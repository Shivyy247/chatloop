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
import { addMembervalidator, getChatDetailsvalidator, getMessagesvalidator, leaveGroupvalidator, newGroupChatvalidator, removeMembervalidator, renameGroupvalidator, sendAttachmentsvalidator, validateHandle } from "../lib/vlidators.js";

const app = express.Router();


// after here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChatvalidator(),validateHandle, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers",addMembervalidator(), validateHandle, addMembers);

app.put("/removemembers", removeMembervalidator(), validateHandle, removeMembers);

app.delete("/leave/:id",leaveGroupvalidator(), validateHandle, leaveMembers);


// send attachments

app.post("/message", attachmentsMulter,sendAttachmentsvalidator(), validateHandle, sendAttachments);

// get message

app.get("/message/:id",getMessagesvalidator(), validateHandle, getMessages);


// get chat details, rename, delete
app
  .route("/:id")
  .get(getChatDetails, getChatDetailsvalidator(), validateHandle)
  .put(renameGroup, renameGroupvalidator(), validateHandle)
  .delete(deleteChat, getChatDetailsvalidator(), validateHandle);

// app.get("/chat/:id/", A);
// app.put("/chat/:id/", B);
// app.delete("/chat/:id/", C);


export default app;