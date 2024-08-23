require('dotenv').config();
const app=require('./app')
const connectMongoDB=require('./db/db.index.ts')

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