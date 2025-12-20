import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { xss } from 'express-xss-sanitizer';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

export default app;
