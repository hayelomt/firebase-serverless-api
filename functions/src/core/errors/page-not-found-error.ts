import ApiError from './api-error';

class PageNotFoundError extends ApiError {
  constructor() {
    super({}, 'Page Not Found', 404);
  }
}

export default new PageNotFoundError();
