import ApiError from './api-error';

export default class AuthorizationError extends ApiError {
  constructor(public message: string = 'Un-Authorized') {
    super({}, message, 403);
  }
}
