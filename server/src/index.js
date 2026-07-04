import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL || process.env.VITE_API_BASE_URL,
    credentials: true,
  }),
);


// app.use((req, res, next) => {
//   console.log('Request Origin:', req.headers.origin);
//   console.log('Allowed Origin:', process.env.VITE_API_BASE_URL);
//   next();
// });

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log('Origin received by CORS:', origin);
//       const allowedOrigin = process.env.VITE_API_BASE_URL?.replace(/\/$/, '');
//       console.log('Allowed origin (trimmed):', allowedOrigin);
      
//       if (!origin || origin === allowedOrigin) {
//         callback(null, true);
//       } else {
//         callback(new Error(`CORS not allowed for origin: ${origin}`));
//       }
//     },
//     credentials: true,
//   }),
// );


app.get('/', (req, res) => {
  res.json({ message: 'Silk Task API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
