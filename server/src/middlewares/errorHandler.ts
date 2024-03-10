import { CustomError } from 'exceptions';
import { Request, Response, NextFunction } from 'express';

export const errorHnadler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (!(err instanceof CustomError)) {
    res.status(500).json({ message: 'Server error, please try again' });
  } else {
    const customError = err as CustomError;
    res.status(customError.status).json({ message: customError.message });
  }
};
