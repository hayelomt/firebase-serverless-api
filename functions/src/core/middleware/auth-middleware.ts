import { NextFunction, Response } from 'express';
import AuthenticationError from '../errors/authentication-error';
import { RequestExtended } from '../types/interfaces';
import AuthorizationError from '../errors/authorization-error';
import { auth } from '../firebase';

export const isAuthenticated = async (
  req: RequestExtended,
  _res: Response,
  next: NextFunction
) => {
  if (!req.token) {
    next(new AuthenticationError('Token Not Provided'));
  }

  try {
    const decodedToken = await auth.verifyIdToken(req.token as string);
    req.user = decodedToken;
  } catch (err) {
    next(new AuthenticationError('Invalid Token'));
  }

  next();
};

export const isUsersProfile = async (
  req: RequestExtended,
  _res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (id !== (req.user as any).uid) {
    next(new AuthorizationError('Unauthorized to edit profile'));
  } else {
    next();
  }
};
