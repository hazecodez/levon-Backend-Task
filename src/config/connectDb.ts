import mongoose from "mongoose";

export const connectDb = () => {
  try {
    const mongoURI = process.env.MONGO_URI as string;
    
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log("DB connection error:", error);
      }); 
  } catch (error) {
    console.log(error);
  }
};
