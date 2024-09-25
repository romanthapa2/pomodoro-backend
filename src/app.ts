import { Application } from "express";
import express from "express";
import cors from "cors";
import user from "./routes/user.route";
import task from "./routes/task.route";
import cookieParser from 'cookie-parser';
import { Request, Response ,NextFunction} from "express";
import { ApiError } from './utils/apiError.utils'; 


const app: Application = express();
app.use('*',
  cors({
    origin:"https://pomodoro-with-music.vercel.app/",
    credentials: true,
  })
)


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/user", user);
app.use("/api/task", task);



// Error handling middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500; // Default to 500 if not set
  const success = err.success || false;
  const message = err.message || "Internal Server Error";


  // Send structured error response
  res.status(statusCode).json({
    success,
    message,
    statusCode,
  });
});






export default app;
