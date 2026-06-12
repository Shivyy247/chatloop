import { compare } from "bcrypt";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//create a new user and save it to the database and save in cookie
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;

  if (!file) return next(new ErrorHandler("please upload avatar!", 400));

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User Created!");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password name");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 401));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Password!", 401));

  sendToken(res, user, 200, `Welcome Back!, ${user.name}`);
});

const googleLogin = TryCatch(async (req, res, next) => {
  console.log("BODY:", req.body);
  const { token } = req.body;

  console.log("TOKEN EXISTS:", !!token);

  if (!token) {
    return next(new ErrorHandler("Google token missing!", 400));
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  console.log("TOKEN VERIFIED");

  const payload = ticket.getPayload();

  const { email, name, picture } = payload;
  console.log("PAYLOAD:", payload);

  let user = await User.findOne({ username: email });
  console.log("USER FOUND:", user);

  // if user doesn't exist → create
  if (!user) {
    console.log("CREATING USER");

    try {
      user = await User.create({
        name,
        username: email,
        bio: "Hey I am using ChatLoop",
        avatar: {
          public_id: "google_avatar",
          url: picture,
        },
        authProvider: "google",
      });

      console.log("USER CREATED");
    } catch (err) {
      console.log("CREATE ERROR:");
      console.log(err);
      throw err;
    }
  }
  console.log("BEFORE SEND TOKEN");
  sendToken(res, user, 200, `Welcome ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not Found!", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

const updateProfile = TryCatch(async (req, res, next) => {
  const { name, bio, username } = req.body;

  const existingUser = await User.findOne({
    username,
    _id: { $ne: req.user },
  });

  if (existingUser) {
    return next(new ErrorHandler("Username already exists", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user,
    {
      name,
      bio,
      username,
    },
    { new: true },
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out Successfully!",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });

  const allUsersFromMyChats = myChats.flatMap((chat) =>
    chat.members.map((member) => member.toString()),
  );

  const allUsersExceptMeAndFriends = await User.find({
    _id: {
      $nin: [...allUsersFromMyChats, req.user],
    },
    name: {
      $regex: name,
      $options: "i",
    },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend request sent Successfully!",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  console.log("BODY:", req.body);

  const request = await Request.findById(requestId)
    .populate("sender", "name avatar")
    .populate("receiver", "name avatar");

  if (!request) {
    return next(
      new ErrorHandler("Request not found or already processed", 404),
    );
  }

  if (!request.receiver || !request.sender) {
    return next(new ErrorHandler("Invalid request data", 400));
  }

  if (request.receiver._id.toString() !== String(req.user)) {
    return next(new ErrorHandler("Not authorized to handle this request", 401));
  }

  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Request Rejected!",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} - ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend request accepted!",
    senderId: request.sender._id,
  });
});

const getMyNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({
    receiver: req.user,
  }).populate("sender", "name avatar");
  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chaId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id),
    );

    return res.status(200).json({
      success: true,
      friend: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  login,
  newUser,
  googleLogin,
  getMyProfile,
  updateProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,

};
