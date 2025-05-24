import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.config.js';
import userRoutes from './routes/user.route.js';
import captainRoutes from './routes/captain.route.js';
import cookieParser from 'cookie-parser';


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cookieParser());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captains', captainRoutes);

export default app;