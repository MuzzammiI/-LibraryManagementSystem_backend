import mongoose from 'mongoose';

// Connect to MongoDB using Mongoose
// This is asynchronous and handles connection errors gracefully for scalability
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);  // Exit process if DB fails (production best practice)
  }
};

export default connectDB;