import {body, validationResult, check} from 'express-validator'
import { ErrorHandler } from '../utils/utility.js';


const validateHandle = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage, 400));
};


const registervalidator = () => [
  body("name", "Please Enter Name:").notEmpty(),
  body("username", "Please Enter username:").notEmpty(),
  body("bio", "Please Enter bio:").notEmpty(),
  body("password", "Please Enter password:").notEmpty(),
  check("avatar", "Please Upload Avatar").notEmpty(),
];

const loginvalidator = () => [
  body("username", "Please Enter username:").notEmpty(),
  body("password", "Please Enter password:").notEmpty(),
];

const newGroupChatvalidator = () => [
  body("name", "Please Enter name:").notEmpty(),
body("members")
    .notEmpty()
    .withMessage("Please Enter Members:")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMembervalidator = () => [
  body("chatId", "Please Enter chatId:").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members:")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];



export {
  registervalidator,
  validateHandle,
  loginvalidator,
  newGroupChatvalidator,
  addMembervalidator,
};