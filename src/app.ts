import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes';
import { globalErrorHandler, notFound } from './middleware';

const app: Application = express();

// ── Core Middleware ──
app.use(
  cors({
    origin: config.client_url,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Health Check ──
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: '🚀 ConsultDesk API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ──
app.use('/api', routes);

// ── 404 Handler ──
app.use(notFound);

// ── Global Error Handler ──
app.use(globalErrorHandler);

export default app;
