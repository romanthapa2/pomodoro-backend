import mongoose, { Document, Schema, Model } from "mongoose";
const bcrypt =require('bcrypt')
const jwt = require("jsonwebtoken")

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "guest";
  date?: Date;
}

// Extend the IUser interface with Document to include Mongoose document properties and methods
export interface IUserDocument extends IUser, Document {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
}


const userSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "guest", enum: ["user", "admin", "guest"] },
  date: { type: Date, default: Date.now },
});


userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken = async function (): Promise<string> {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCSS_TOKEN_SECRET_KEY as string,
    {
      expiresIn: process.env.ACCSS_TOKEN_SECRET_EXPREY,
    }
  );
};


const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);
module.exports=User;
