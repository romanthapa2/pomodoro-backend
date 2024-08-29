import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import asyncHandler from "../utils/asyncHandler.utils";
import User from "../models/user.model";
import { Request, Response } from "express";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new ApiError(400, "User already exits please login");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password -email");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the User");
  }

  const accessToken = await createdUser.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: createdUser, accessToken },
        "User registered Successfully"
      )
    );
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(400, "User does not exits please signup");
  }

  const comparePassword = await user.isPasswordCorrect(password);

  if (!comparePassword) {
    throw new ApiError(400, "password is incorrect");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  const accessToken = await user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in Successfully"
      )
    );
});

export default {registerUser, loginUser}
