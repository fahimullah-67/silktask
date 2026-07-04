// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async (retries = 3, delay = 1000) => {
  // If connection exists, use it
  if (cached.conn) {
    console.log('✅ Using cached database connection');
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      // Add these for better reliability
      retryWrites: true,
      w: 'majority',
    };

    console.log(`🔄 Connecting to MongoDB (${retries} retries remaining)...`);
    
    const connectWithRetry = async (attempt = 0) => {
      try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, opts);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        return conn;
      } catch (error) {
        if (attempt < retries) {
          console.log(`⚠️ Connection attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return connectWithRetry(attempt + 1);
        }
        throw error;
      }
    };

    cached.promise = connectWithRetry()
      .catch((error) => {
        console.error('❌ MongoDB connection error after all retries:', error.message);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

// Event listeners for debugging
mongoose.connection.on('connected', () => {
  console.log('📶 MongoDB event: Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('📶 MongoDB event: Error', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📶 MongoDB event: Disconnected');
});

// Handle process termination
const handleDisconnect = async () => {
  if (cached.conn) {
    await cached.conn.disconnect();
    console.log('📶 MongoDB connection closed');
  }
  process.exit(0);
};

process.on('SIGINT', handleDisconnect);
process.on('SIGTERM', handleDisconnect);

export default connectDB;