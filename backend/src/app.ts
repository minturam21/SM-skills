
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import process from 'process';
import apiRoutes from './routes/index.ts';
import { errorHandler } from './middleware/error.middleware.ts';
import { ENV } from './config/env.ts';

const app: Application = express();

// Security & Utility Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
if (ENV.NODE_ENV === 'development') app.use(morgan('dev'));

// Parsing
app.use(express.json({ limit: ENV.UPLOAD_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: ENV.UPLOAD_LIMIT }));

// Static Assets
app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'uploads')));

// API Entry Point
app.use('/api', apiRoutes);

// Catch-all Error Handling
app.use(errorHandler);

export default app;
