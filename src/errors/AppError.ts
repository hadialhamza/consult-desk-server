import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Pre-built common errors
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'You are not authorized') {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request') {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(StatusCodes.CONFLICT, message);
  }
}

export default AppError;
