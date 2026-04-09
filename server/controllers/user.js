import {User} from '../models/user.js'



//create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {

  const {name, username, password, bio } = req.body;
  
  const avatar = {
    public_id: "Sdfsd",
    url: "asdfd",
  }

  await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  })

  res
    .status(201)
    .json({ message: "User Created successfully!" })
};

const login = (req, res) => {
  res.send("hello shivi!");
};

export { login, newUser };
