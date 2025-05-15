import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', postRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Blog API' });
});

// Connect to MongoDB only when not testing
if (process.env.NODE_ENV !== 'test') {
  connectDB();
  
  // Start server only in non-test environment
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;