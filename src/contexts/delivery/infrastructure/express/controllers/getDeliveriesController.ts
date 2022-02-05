import { NextFunction, Request, Response } from 'express';

async function getDeliveriesController(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    response.send('Hello Delivery!');
  } catch (error) {
    next(error);
  }
}

export default getDeliveriesController;
