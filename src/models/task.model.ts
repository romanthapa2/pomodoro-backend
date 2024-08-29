import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  date: Date;
  time: string;
  task: string;
  total_minutes: number;
}

const taskSchema = new Schema<ITask>({
  date: { type: Date, default: Date.now },
  time: { type: String, required: true },
  task: { type: String, required: true },
  total_minutes: { type: Number, required: true },
});

const Task = mongoose.model<ITask>("task", taskSchema);
export default Task
