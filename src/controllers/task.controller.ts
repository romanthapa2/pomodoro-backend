import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import asyncHandler from "../utils/asyncHandler.utils";
import Task from "../models/task.model";
import { Request, Response } from "express";

const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { time, task, total_minutes } = req.body;

  const newTask = await Task.create({ time, task, total_minutes });

  if (!newTask) {
    throw new ApiError(500, "Something went wrong while creating the task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { task: newTask }, "Task created successfully"));
});

export default createTask
