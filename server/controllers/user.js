import {User} from '../models/user.js'
import { sendToken } from '../utils/features.js';



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

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("password");
  
  if(!user) return res.status(400).json({
    message: "Invalid credentials",
  });

  const isMatch = await compare(password, user.password);

  if (!isMatch) return res.status(400).json({
    message: "Invalid credentials"
  });

  sendToken(res, user, 201, `Welcome Back!, ${user.name}`);
};

export { login, newUser };
