// utils/handleServiceError.ts

import { Response } from 'express';
import { AxiosError } from 'axios';

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function handleServiceError(res: Response, error: any): void {
  if (isAxiosError(error)) {
    if (error.response) {
      res.status(error.response.status).json({
        message: error.message,
        details: error.response.data,
      });
    } else if (error.request) {
      res.status(503).json({
        message: 'No response received from service',
        details: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Error in request setup',
        details: error.message,
      });
    }
  } else if (error instanceof Error) {
    res.status(400).json({
      message: 'Invalid request',
      details: error.message,
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      details: 'An unknown error occurred',
    });
  }
}
