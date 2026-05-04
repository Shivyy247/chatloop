import express from "express"
import {
  getMyProfile,
  login,
  newUser,
  searchUser,
  logout,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { loginvalidator, registervalidator, validateHandle } from "../lib/vlidators.js";

const app = express.Router();


app.post("/new", singleAvatar, registervalidator(), validateHandle, newUser);

app.post("/login" , loginvalidator() , validateHandle, login);

// after here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.get("/logout", logout);

app.get("/search", searchUser);


export default app