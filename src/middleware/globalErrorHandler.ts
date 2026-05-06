import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import {
  handleValidationError,
  handleCastError,
  handleDuplicateKeyError,
  handleZodError,
} from '../errors/handleErrors';
import { IErrorMessage } from '../types';

const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = 'Something went wrong';
  let errorMessages: IErrorMessage[] = [];

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const simplified = handleValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  }
  // Mongoose Cast Error
  else if (err instanceof mongoose.Error.CastError) {
    const simplified = handleCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  }
  // Zod Validation Error
  else if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  }
  // MongoDB Duplicate Key Error
  else if ((err as any).code === 11000) {
    const simplified = handleDuplicateKeyError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  }
  // Custom App Error
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [{ path: '', message: err.message }];
  }
  // Generic Error
  else if (err instanceof Error) {
    message = err.message;
    errorMessages = [{ path: '', message: err.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
