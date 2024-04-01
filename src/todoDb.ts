import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database is connected");
    return Promise.resolve()
  } catch (error) {
    console.log(error);
    return Promise.reject()
  }
};


export default connectDb