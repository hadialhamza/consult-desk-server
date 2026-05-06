import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Handles 404 — route not found.
 */
const notFound = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

export default notFound;
