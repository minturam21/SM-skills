import { Response } from 'express';

export const sendResponse = (res: Response, statusCode: number, success: boolean, message: string, data: any = null) => {
  // Fix: Explicitly cast res to any because the environment's Response type definition is missing the status() method
  return (res as any).status(statusCode).json({
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};