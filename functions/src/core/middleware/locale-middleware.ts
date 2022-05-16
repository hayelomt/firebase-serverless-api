import { NextFunction, Response } from 'express';
import { RequestExtended } from '../types/interfaces';
import { parseLocale } from '../util/utility';

export const localeMiddleware = async (
  req: RequestExtended,
  _res: Response,
  next: NextFunction
) => {
  req.locale = parseLocale(req.query.locale);
  next();
};
