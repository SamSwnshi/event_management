import mongoose from "mongoose";

const config = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/events-app";
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MONGO DB 😎");
  } catch (error) {
    console.log("Error in connecting to MONGO DB 😟", error);
    console.log("Continuing without database connection...");
  }
};

export default config;
