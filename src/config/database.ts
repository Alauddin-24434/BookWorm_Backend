import env from "dotenv";
env.config();
// database configuration file
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Failed to connect database", error);
    process.exit(1);
  }
};

