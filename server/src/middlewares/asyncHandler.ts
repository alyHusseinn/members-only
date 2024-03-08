import { Request, Response, NextFunction } from 'express';

/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */

type ControllerFunc = (req: Request, res: Response, next: NextFunction) => void;

export const asyncHandler = (fn: ControllerFunc) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
