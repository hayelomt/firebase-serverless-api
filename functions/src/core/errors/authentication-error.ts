import ApiError from './api-error';

export default class AuthenticationError extends ApiError {
  constructor(public message: string = 'Not Authenticated') {
    super({}, message, 401);
  }
}
