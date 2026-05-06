import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { IErrorResponse } from '../types';

// Handle Mongoose Validation Error
export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IErrorResponse => {
  const errors = Object.values(err.errors).map((el) => ({
    path: el.path,
    message: el.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

// Handle Mongoose Cast Error (invalid ObjectId etc.)
export const handleCastError = (
  err: mongoose.Error.CastError
): IErrorResponse => {
  return {
    statusCode: 400,
    message: `Invalid ${err.path}: ${err.value}`,
    errorMessages: [
      {
        path: err.path,
        message: `Invalid ${err.path}: ${err.value}`,
      },
    ],
  };
};

// Handle Mongoose Duplicate Key Error
export const handleDuplicateKeyError = (err: any): IErrorResponse => {
  const field = Object.keys(err.keyValue)[0];
  return {
    statusCode: 409,
    message: `Duplicate value for field: ${field}`,
    errorMessages: [
      {
        path: field,
        message: `${field} already exists`,
      },
    ],
  };
};

// Handle Zod Validation Error
export const handleZodError = (err: ZodError): IErrorResponse => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
