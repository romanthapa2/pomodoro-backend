require('dotenv').config();
import app from "./app";
// const app=require('./app')
// const connectMongoDB=require('./db/index.js')
import connectDB from './db/index.js';

const port=process.env.PORT;

connectDB()
.then(()=>{
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
})
.catch((error:Error)=>{
    console.log("mongodb connection failed",error);
})
