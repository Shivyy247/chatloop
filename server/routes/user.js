import express from "express"
import {
  getMyProfile,
  updateProfile,
  login,
  newUser,
  googleLogin,
  searchUser,
  logout,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestvalidator, loginvalidator, registervalidator, sendRequestvalidator, validateHandle } from "../lib/vlidators.js";

const app = express.Router();


app.post("/new", singleAvatar, registervalidator(), validateHandle, newUser);

app.post("/login", loginvalidator(), validateHandle, login);

app.post("/google", googleLogin);

// after here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.put("/update", updateProfile);

app.get("/logout", logout);

app.get("/search", searchUser);

app.put(
  "/sendrequest",
  sendRequestvalidator(),
  validateHandle,
  sendFriendRequest);

app.put(
  "/acceptrequest",
  acceptRequestvalidator(),
  validateHandle,
  acceptFriendRequest,
);

app.get("/notifications", getMyNotifications);

app.get("/friends", getMyFriends);


export default app