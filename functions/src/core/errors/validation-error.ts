import { ValidationErrorType } from '../types/types';
import ApiError from './api-error';

export default class ValidationError extends ApiError {
  constructor(public errors: ValidationErrorType) {
    super(errors, 'Bad Request', 400);
  }
}
