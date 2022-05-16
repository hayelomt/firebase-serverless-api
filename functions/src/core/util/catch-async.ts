import { RequestHandler, Request, Response, NextFunction } from 'express';

export default (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log('ERROR THROWN', err);
      next(err);
    }
  };
