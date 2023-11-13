import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_LOCAL, {
      autoIndex: true,
    });
    console.log("Connected to Database");
  } catch (err) {
    console.error("Failed to connect to Database!", err);
  }
};
