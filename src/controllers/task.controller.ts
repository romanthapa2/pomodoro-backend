const ApiError = require("../utils/apiError.utils.js");
const ApiResponse = require("../utils/apiResponse.utils.js");
const asyncHandler = require("../utils/asyncHandler.utils");
const Task = require("../models/task.model.js");
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

module.exports = createTask;
