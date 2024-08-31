import express, { Request, Response, NextFunction } from "express";
import userController from "../controllers/user.controller";
import { body, validationResult } from "express-validator";
import ApiError from "../utils/apiError.utils";

const router = express.Router();
const { registerUser, loginUser } = userController;

const validateRegister = [
  body('email')
    .isEmail().normalizeEmail().withMessage('Email is not valid'),
  body('password').trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

router.post("/register",
validateRegister,
(req:Request,res:Response,next:NextFunction)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array().map((err : {msg:String}) => err.msg).join(", "))
  }
  next();
},
registerUser
)

router.route("/login").post(loginUser)

export default router;