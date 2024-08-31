import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/apiError.utils";
import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler.utils";
import { RequestHandler } from "express";

const jwt_secret = process.env.ACCSS_TOKEN_SECRET_KEY as string; // Ensure that this environment variable is a string

import { Request, Response, NextFunction } from "express";
interface DecodedToken {
    _id: string;
    iat?: number;
    exp?: number;
  }

export const verifyUserByJWT: RequestHandler = asyncHandler(async (req: Request, _:Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("auth-token")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "please authenticate using a valid user");
    }
    const decodedToken = jwt.verify(token, jwt_secret) as DecodedToken;
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      throw new ApiError(404, "Invalid Acess Token");
    }
    (req as any).user = user;
    next();
} catch (error) {
    throw new ApiError(401, error instanceof Error ? error.message : "Invalid access token");
}

});

export const verifyAdminByJwt: RequestHandler = asyncHandler(async (req:Request, _: Response, next:NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("auth-token")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Please authenticate using a valid user");
    }
    const decodedToken = jwt.verify(token, jwt_secret) as JwtPayload;
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user || user.role !== "admin") {
      throw new ApiError(403, "Unauthorized to access this route");
    }
    (req as any).user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error instanceof Error ? error.message : "Invalid access token");
  }
});
