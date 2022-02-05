import HttpError from './HttpError';

class UnauthorizedError extends HttpError {
  statusCode = 401;

  constructor(public message: string = 'Not Authorized') {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ code: this.statusCode, message: this.message }];
  }
}

export default UnauthorizedError;
