import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.v.js';
import authRoutes from '../routes/authRoutes.js';
import taskRoutes from '../routes/taskRoutes.js';
import { notFound, errorHandler } from '../middleware/errorMiddleware.js';


dotenv.config();
connectDB();

const app = express();


app.use(express.json());


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        process.env.CLIENT_URL,
        process.env.VITE_API_BASE_URL,
        "https://silktask.vercel.app",
        "https://silktask.vercel.app",
      ].filter(Boolean);
      
      // For development, allow localhost
      if (process.env.NODE_ENV === 'development') {
        allowedOrigins.push('http://localhost:5173', 'http://localhost:5137');
      }
      
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        console.error('Blocked by CORS:', origin);
        callback(new Error(`CORS not allowed for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);


app.get('/', (req, res) => {
  res.json({ 
    message: 'Silk Task API is running on Vercel',
    environment: process.env.NODE_ENV
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;