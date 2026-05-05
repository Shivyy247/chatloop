import {body, validationResult, check, param, query} from 'express-validator'
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

const removeMembervalidator = () => [
  body("chatId", "Please Enter chatId:").notEmpty(),
  body("userId", "Please Enter userId:").notEmpty(),
];

const leaveGroupvalidator = () => [
  param("id", "Please Enter chatId:").notEmpty(),
];

const sendAttachmentsvalidator = () => [
  body("chatId", "Please Enter chatId:").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("please upload attachments!")
    .isArray({ min: 1, max: 5 })
    .withMessage("Members must be 1-5"),
];

const getMessagesvalidator = () => [
  param("id", "Please Enter chatId:").notEmpty(),
];

const getChatDetailsvalidator = () => [
  param("id", "Please Enter chatId:").notEmpty(),
];

const renameGroupvalidator = () => [
  param("id", "Please Enter chatId!").notEmpty(),
  body("name", "Please Enter New Name!").notEmpty(),
];

const sendRequestvalidator = () => [
  body("userId", "Please Enter User Id!").notEmpty(),
];

const acceptRequestvalidator = () => [
  body("requestId", "Please Enter request Id!").notEmpty(),
  body("accept")
    .notEmpty()
    .isBoolean()
    .withMessage("Please add accept"),
];

const adminLoginvalidator = () => [
  body("secretKey","Please Enter Secret Key").notEmpty(),
];

export {
  registervalidator,
  validateHandle,
  loginvalidator,
  newGroupChatvalidator,
  addMembervalidator,
  removeMembervalidator,
  leaveGroupvalidator,
  sendAttachmentsvalidator,
  getMessagesvalidator,
  getChatDetailsvalidator,
  renameGroupvalidator,
  sendRequestvalidator,
  acceptRequestvalidator,
  adminLoginvalidator,
};