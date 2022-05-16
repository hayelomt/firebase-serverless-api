import { Request } from 'express';
import { SupportedLocales } from './enums';
import { AuthUser } from './types';

export interface RequestExtended extends Request {
  locale?: SupportedLocales;
  token?: string;
  user?: AuthUser;
}
