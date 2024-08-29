import dotenv from 'dotenv'
dotenv.config();
import { Application } from "express";
import express from 'express';
import cors from 'cors';
import user from "./routes/user.route"
import task from "./routes/task.route"

const app:Application = express();
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/user",user);
app.use("/api/task",task);

export default app