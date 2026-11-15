import mongoose from 'mongoose';

export async function connectToMongoDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`You successfully connected to MongoDB! ${mongoose.connection.host}:${mongoose.connection.port}`);
    return mongoose;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}
