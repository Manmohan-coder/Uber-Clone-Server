import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.config.js';
import userRoutes from './routes/user.route.js';
import captainRoutes from './routes/captain.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
connectDB();
app.use(cors(
    { 
        origin: 'http://localhost:5173', 
        credentials: true 
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captains', captainRoutes);

export default app;