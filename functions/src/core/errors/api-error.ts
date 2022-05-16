import { ErrorType } from '../types/types';

export default class ApiError {
  constructor(
    public errors: ErrorType,
    public message: string = 'Unknown Server Error',
    public status: number = 500
  ) {}
}
