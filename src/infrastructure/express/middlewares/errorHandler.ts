import { Request, Response } from 'express';

import BaseError from '../errors/HttpError';

const errorHandler = (err: Error, req: Request, res: Response): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    // eslint-disable-next-line no-console
    console.error('ErrorHandler: Server Error 500');

    // eslint-disable-next-line no-console
    console.error(err);

    res.status(500).send({
      errors: [{ message: 'Something went wrong' }],
    });
  }
};

export default errorHandler;
