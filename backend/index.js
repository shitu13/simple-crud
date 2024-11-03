import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoute.js'

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());


// Connect to MongoDB
connectDB();
app.use(cors());

// Routes
app.use('/api', userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Disaster Management App API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});