import mongoose, { Schema, Document,Types} from "mongoose";

interface ITask extends Document {
  date: Date;
  user:Types.ObjectId;
  time: string;
  task: string;
  total_minutes: number;
}

const taskSchema = new Schema<ITask>({
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true},
  time: { type: String, required: true },
  task: { type: String, required: true },
  total_minutes: { type: Number, required: true },
});

const Task = mongoose.model<ITask>("task", taskSchema);
export default Task
