import { Router } from 'express';
import validationHandler from '../../core/middleware/validation-handler';
import AuthController from './auth.controller';
import { loginValRules } from './validators/login.validator';

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post(
  '/login',
  validationHandler(loginValRules),
  authController.login()
);

export default authRoutes;
