import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { xss } from 'express-xss-sanitizer';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(xss());

// Routes import
import flightRoutes from './routes/flight.routes.js';
import authRoutes from './routes/auth.routes.js';
import walletRoutes from "./routes/wallet.routes.js"

// Routes setting
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/wallet" , walletRoutes);

export default app;
