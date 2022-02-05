import HttpError from './HttpError';

class BadRequestError extends HttpError {
  statusCode = 400;

  constructor(public message: string = 'Bad Request') {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ code: this.statusCode, message: this.message }];
  }
}

export default BadRequestError;
