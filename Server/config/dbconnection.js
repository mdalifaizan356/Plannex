import mongoose, { connect } from "mongoose";

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected ${connect.connection.host}`);
    }
    catch (error) {
        console.log("DB Connection Error", error.message);    
    }
}

export default connectDB;