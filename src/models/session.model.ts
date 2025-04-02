import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  user: mongoose.Schema.Types.ObjectId;
  type: "WORK" | "SHORT_BREAK" | "LONG_BREAK";
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  task?: mongoose.Schema.Types.ObjectId;
}

const SessionSchema = new Schema<ISession>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["WORK", "SHORT_BREAK", "LONG_BREAK"], required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  completed: { type: Boolean, default: false },
  task: { type: Schema.Types.ObjectId, ref: "Task" },
});

export default mongoose.model<ISession>("Session", SessionSchema);
