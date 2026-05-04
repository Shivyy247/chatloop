import { compare } from 'bcrypt';
import { TryCatch } from '../middlewares/error.js';
import {User} from '../models/user.js'
import { cookieOptions, emitEvent, sendToken } from '../utils/features.js';
import { ErrorHandler } from '../utils/utility.js';
import { Chat } from "../models/chat.js";
import {Request} from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/events.js';


//create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {

  const {name, username, password, bio } = req.body;
  
  const avatar = {
    public_id: "Sdfsd",
    url: "asdfd",
  }

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });


  sendToken(res, user, 201, "User Created!");
};

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password name");
  
  if (!user) return next(new ErrorHandler("Invalid Username or Password"))

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new Error("Invalid Password!"));
  
  
  sendToken(res, user, 200, `Welcome Back!, ${user.name}`);

}
)

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions , maxAge: 0})
    .json({
      success: true,
      message: "Logged out Successfully!",
    });
});

const searchUser = TryCatch(async (req, res) => {

  const { name = "" } = req.query;

  const myChats = await Chat.find({
    groupChat: false,
    members: req.user
  });


  // All users from my chats means friends or people I have chatted with
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  const allUsersExpectMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: {$regex: name, $options: "i"},
  });

    //modyfying the response
  const users = allUsersExpectMeAndFriends.map(({_id, name, avatar}) => ({
    _id,
    name,
    avatar: avatar.url,
  }))

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res) => {

  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ]
  })
  
  if (request) return next(new ErrorHandler("Request already sent", 4000));

  await Request.create({
    sender: req.user,
    receiver: userId,
  })

  emitEvent(req,NEW_REQUEST, [userId]);

  return res
    .status(200)
    .json({
      success: true,
      message: "Friend request sent Successfully!",
    });
});

const acceptFriendRequest = TryCatch(async (req, res) => {

  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name")
  
  if (!request) return next(new ErrorHandler("Request not found!", 404));

  if (request.receiver.toString() !== req.user.toString())
    return next(
      new ErrorHandler("you are not authorized to accept this request!", 401)
    );
  
  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Request Rejected!",
    })
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} -${request.receiver.name}`,
    }),
    request.deleteOne(),
  ])

  emitEvent(req, REFETCH_CHATS, members);

  return res
    .status(200)
    .json({
      success: true,
      message: "Friend request accepted!",
      senderId: request.sender._id,
    });
});

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
};
