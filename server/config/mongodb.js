import mongoose from "mongoose";

const connectDB = async () => {
  console.log("MONGODB_URI =>", process.env.MONGODB_URI); // ✅ add this
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
};

export default connectDB;
