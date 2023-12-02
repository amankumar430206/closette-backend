import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      autoIndex: true,
    })
    .then((connection) => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error("Failed to connect to Database..", err.code);
    });
};
