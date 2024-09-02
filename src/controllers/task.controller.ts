import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import asyncHandler from "../utils/asyncHandler.utils";
import Task from "../models/task.model";
import { Request, Response } from "express";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { task, total_minutes } = req.body;
  const newTask = await Task.create({ task, total_minutes,user: (req as any).user._id });

  if (!newTask) {
    throw new ApiError(500, "Something went wrong while creating the task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { task: newTask }, "Task created successfully"));
});


export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find({ user: (req as any).user._id});

  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No tasks found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { tasks }, "Tasks retrieved successfully"));
});