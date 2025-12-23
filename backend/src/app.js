import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { xss } from 'express-xss-sanitizer';
const app = express();
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
dotenv.config();

// Middleware
app.use(cors({
    origin : process.env.FRONTEND_URL ||"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(xss());
app.use(cookieParser())

// Routes import
import flightRoutes from './routes/flight.routes.js';
import authRoutes from './routes/auth.routes.js';
import walletRoutes from "./routes/wallet.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

// Routes setting
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/wallet" , walletRoutes);
app.use("/api/booking" , bookingRoutes);

export default app;
