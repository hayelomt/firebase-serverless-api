import { NextFunction, Response } from 'express';
import AuthorizationError from '../errors/authorization-error';
import { RequestExtended } from '../types/interfaces';
import { UserType } from '../types/enums';

export const checkUserType =
  (userTypes: UserType[]) =>
  async (req: RequestExtended, _res: Response, next: NextFunction) => {
    const userType = req.user?.userType ? req.user.userType : null;

    if (userType && userTypes.includes(userType)) {
      next();
    } else {
      next(new AuthorizationError());
    }
  };
