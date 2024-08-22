import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        // Ensure the MongoDB URL is defined
        const mongodbUrl = process.env.MONGODB_URL;
        if (!mongodbUrl) {
            throw new Error('MongoDB URL is not defined in environment variables');
        }

        await mongoose.connect(mongodbUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

export default connectDB;
