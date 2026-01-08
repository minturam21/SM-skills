import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoutes from './routes/index';
import { errorHandler } from './middleware/error.middleware';
import { ENV } from './config/env';
import { CONSTANTS } from './config/constants';

const app: Application = express();

// 1. Core Security & Logging
// Fix: Cast helmet to any to bypass type mismatch with Express Application in this environment
app.use(helmet({ crossOriginResourcePolicy: false }) as any);
// Fix: Cast cors to any to bypass type mismatch with Express Application in this environment
app.use(cors() as any);
// Fix: Cast morgan to any to bypass type mismatch with Express Application in this environment
if (ENV.NODE_ENV === 'development') app.use(morgan('dev') as any);

// 2. Request Parsing
// Fix: Cast express.json to any to bypass type mismatch with Express Application in this environment
app.use(express.json({ limit: ENV.UPLOAD_LIMIT }) as any);
// Fix: Cast express.urlencoded to any to bypass type mismatch with Express Application in this environment
app.use(express.urlencoded({ extended: true, limit: ENV.UPLOAD_LIMIT }) as any);

// 3. Static File Access
// Fix: Cast express.static to any to bypass type mismatch with Express Application in this environment
app.use('/uploads', express.static(CONSTANTS.UPLOADS.ROOT) as any);

// 4. API Core Routing (Routes are aggregated in routes/index.ts)
app.use('/api', apiRoutes);

// 5. Global Error Handler (MUST be last)
app.use(errorHandler);

export default app;