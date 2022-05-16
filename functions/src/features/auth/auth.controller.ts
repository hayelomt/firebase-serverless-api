import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../core/util/catch-async';
import ApiError from '../../core/errors/api-error';
import AuthenticationError from '../../core/errors/authentication-error';
import { signIn } from './auth.service';

export default class AuthController {
  login() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
          const { data, token } = await signIn(email, password);
          res.status(200).json({ data, token, userId: data.user?.uid });
        } catch (err) {
          next(new AuthenticationError((err as ApiError).message));
        }
      }
    );
  }
}
