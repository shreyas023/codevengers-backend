import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default dbConnect;