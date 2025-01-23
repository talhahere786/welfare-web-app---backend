import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectDB = async() => {
  try {
    // Connecting to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the successful connection with the host info
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message and exit with a failure code (1)
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
