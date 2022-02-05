import { Request, Response } from 'express';

import Joi from 'joi';
import NotAcceptableError from '../../../../../infrastructure/express/errors/NotAcceptableError';

function validateQuery(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    const { error, value } = schema.validate(request.query, { abortEarly: false });

    if (error) {
      const errorPayload = error.details.map((errorItem) => ({
        field: errorItem.context?.label,
        message: errorItem.message,
      }));

      throw new NotAcceptableError(errorPayload);
    } else {
      request.query = value;

      next();
    }
  };
}

export default validateQuery;
