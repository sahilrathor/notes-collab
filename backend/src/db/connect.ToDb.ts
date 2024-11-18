import mongoose from "mongoose";


const connectToDb = async() => {
    try {
        // constants are not undefined from .env file
        await mongoose.connect(process.env.MONGO_DB_URI!)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("error:", error)
    }
}

export default connectToDb;