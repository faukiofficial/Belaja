import mongoose from "mongoose";
import { config } from "dotenv";
config()

const dbUrl:string = process.env.MONGODB_URL || ""

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
    } catch (err:any) {
        console.error(err.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB