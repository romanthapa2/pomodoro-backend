const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)

        console.log('Connected to MongoDB')
    }catch(error){
        throw new Error('Failed to connect to mongoose')
    }
}

module.exports=connectDB;