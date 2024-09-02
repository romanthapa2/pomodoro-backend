import { Application } from "express";
import express from "express";
import cors from "cors";
import user from "./routes/user.route";
import task from "./routes/task.route";
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use('*',
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/user", user);
app.use("/api/task", task);

export default app;
