import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());  // Enable CORS for frontend
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));