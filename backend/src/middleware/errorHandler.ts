import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@types/index';
import { AppError } from '@utils/appError';
import env from '@config/env';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let isOperational = false;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    isOperational = error.isOperational ?? true;
  } else if ('statusCode' in error) {
    statusCode = (error as any).statusCode;
    message = error.message;
  }

  if (env.isDevelopment) {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      statusCode,
    });
  }

  const response: ApiResponse = {
    success: false,
    message,
    error: env.isDevelopment ? error.message : 'An error occurred',
  };

  res.status(statusCode).json(response);
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
