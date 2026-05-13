import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("db connection error", error);
    process.exit(1);
  }
};

export default dbConnection;
