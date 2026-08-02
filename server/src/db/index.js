import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000,
      },
    });

    console.log("MongoDB is Connected for Jadoo!!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;