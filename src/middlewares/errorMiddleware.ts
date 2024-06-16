import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger/logger';

interface HttpError extends Error {
  status?: number;
}

const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  Logger.error(
    `Status: ${status} - Message: ${message} - Path: ${req.path} - Method: ${req.method} - IP: ${req.ip}`,
  );

  res.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware;
