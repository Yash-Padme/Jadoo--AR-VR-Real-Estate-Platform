// Import the Mongoose library for MongoDB interaction.
import mongoose from "mongoose";

// Define an asynchronous function to connect to the MongoDB database.
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables.
    // The connection options specify write concern for data durability and timeout.
    await mongoose.connect(process.env.MONGODB_URI, {
      writeConcern: {
        w: "majority", // Ensures write operations are acknowledged by the majority of replica set members.
        j: true,       // Ensures write operations are written to the journal.
        wtimeout: 1000, // Sets a timeout for write concern acknowledgment in milliseconds.
      },
    });

    // Log a success message if the connection is established.
    console.log("MongoDB is Connected for Jadoo!!");
  } catch (error) {
    // Log an error message if the connection fails.
    console.error("MongoDB connection failed:", error);
    // Exit the process with a failure code.
    process.exit(1);
  }
};

// Export the connectDB function as the default export.
export default connectDB;