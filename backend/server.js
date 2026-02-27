import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleWare.js';
import resultRoutes from './routes/resultRoutes.js';
import examRoutes from './routes/examRoutes.js';
dotenv.config();

const app = express();

// Middleware
// Add your Vercel URL to the allowed origins
app.use(cors({
    origin: ['http://localhost:5173', 'https://result-checker-olive.vercel.app'], // Replace with your actual Vercel URL
    credentials: true
}));
app.use(express.json()); 

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);
// Root Endpoint for testing
app.get('/', (req, res) => {
    res.send('J&K Results API is running...');
});

// Custom Error Middleware (MUST be the last middleware)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});