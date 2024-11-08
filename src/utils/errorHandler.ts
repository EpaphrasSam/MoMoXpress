export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
}; 