import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.config.js';
import userRoutes from './routes/user.route.js';
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use('/api/v1/users', userRoutes);

export default app;