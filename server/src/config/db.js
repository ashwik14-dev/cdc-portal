import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not set in environment variables");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: Number(process.env.DB_CONNECT_TIMEOUT_MS) || 8000,
    });
    console.log("MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Check that MongoDB is running and that MONGO_URI in server/.env is correct.");
    process.exit(1);
  }
}
