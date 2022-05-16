import { check } from 'express-validator';

export const loginValRules = [
  check('email')
    .isString()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Must be a valid email'),
  check('password').isString().withMessage('Password required'),
];
