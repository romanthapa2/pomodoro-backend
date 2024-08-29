import dotenv from "dotenv"
dotenv.config();
import app from './app'
import connectMongoDB from "./db/db.index"

const port=process.env.PORT;

connectMongoDB()
.then(()=>{
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
})
.catch((error:Error)=>{
    console.log("mongodb connection failed",error);
})