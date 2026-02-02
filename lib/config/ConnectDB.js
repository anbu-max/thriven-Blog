import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI?.trim();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function ConnectDB() {
  if (!MONGODB_URI) {
      console.error("❌ MONGODB_URI is missing in .env.local!");
      throw new Error("MONGODB_URI is not defined");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, 
      connectTimeoutMS: 10000,
    };

    console.log("🛰️ Attempting MongoDB connection...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    }).catch(err => {
      console.error("❌ MongoDB Connection Database Error:", err.message);
      if (err.message.includes('ENOTFOUND')) {
          console.error("👉 DNS Warning: Your network is having trouble resolving the MongoDB hostname. Try using Google DNS (8.8.8.8) or a different internet connection.");
      }
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default ConnectDB;
