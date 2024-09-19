import express, { Request, Response, NextFunction } from "express";
import {ApiError} from "../utils/apiError.utils";
import {createTask}  from "../controllers/task.controller";
import { verifyAdminByJwt, verifyUserByJWT } from '../middleware/auth.middleware';
import { body, validationResult } from "express-validator";
import { getTasks } from "../controllers/task.controller";

const router = express.Router();

const validateTask = [
  body("task").notEmpty().withMessage("task must not be empty"),
  body("total_minutes")
    .notEmpty()
    .withMessage("total minutes must not be empty"),
];


router.post(
  "/tasks",
verifyUserByJWT,
  validateTask,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(
        400,
        errors.array().map((err: { msg: String }) => err.msg).join(", ")
      );
    }
    next();
  },
  createTask
);


router.get("/task",verifyUserByJWT,getTasks)

export default router
