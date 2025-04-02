import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  createdAt: Date;
  completed: boolean;
  sessions: mongoose.Schema.Types.ObjectId[];
}

const TaskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
});

export default mongoose.model<ITask>("Task", TaskSchema);
