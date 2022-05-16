import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/api-error';

export default (err: Error, _req: Request, res: Response, _: NextFunction) => {
  let status = 500;
  let message = 'Unknown Error Occurred';
  let errors = {};

  console.log('API ERROR', err);
  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    errors = err.errors;
  }

  res.status(status).json({ message, errors });
};
