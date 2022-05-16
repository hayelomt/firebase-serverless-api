import ApiError from './api-error';

export default class ResourceNotFoundError extends ApiError {
  constructor(public message: string = 'Not Found') {
    super({}, message, 404);
  }
}
