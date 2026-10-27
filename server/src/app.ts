import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRouter from './routes/api';

export const createApp = () => {
  const app = express();

  // Basic security and request parsing
  const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
    : ['http://localhost:5173'];

  app.use(cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl) or if origin is in allowed list
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for local birthday demo
    },
    credentials: true,
  }));

  app.use(express.json({ limit: '1mb' }));

  // API router
  app.use('/api', apiRouter);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, error: 'Route not found' });
  });

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('API Error:', err);
    res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
  });

  return app;
};

export default createApp;
