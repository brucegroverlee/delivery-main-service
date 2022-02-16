import express from 'express';
import validateBody from '../../../shared/infrastructure/express/validators/validateBody';
import validateParams from '../../../shared/infrastructure/express/validators/validateParams';

import createDeliveryController from './controllers/createDelivery';
import createDeliveryBodySchema from './controllers/createDelivery/bodySchema';

import recipientAcceptRequestController from './controllers/recipientAcceptRequest';
import recipientAcceptRequestParamsSchema from './controllers/recipientAcceptRequest/paramsSchema';
import recipientAcceptRequestBodySchema from './controllers/recipientAcceptRequest/bodySchema';

import recipientRejectRequest from './controllers/recipientRejectRequest';
import recipientRejectRequestParamsSchema from './controllers/recipientRejectRequest/paramsSchema';

import senderAcceptDeliveryFare from './controllers/senderAcceptDeliveryFare';
import senderAcceptDeliveryFareParamsSchema from './controllers/senderAcceptDeliveryFare/paramsSchema';

const deliveries = express.Router();

deliveries.post('/deliveries', validateBody(createDeliveryBodySchema), createDeliveryController());

deliveries.patch(
  '/deliveries/:deliveryId/recipient-accept-request',
  validateParams(recipientAcceptRequestParamsSchema),
  validateBody(recipientAcceptRequestBodySchema),
  recipientAcceptRequestController(),
);

deliveries.patch(
  '/deliveries/:deliveryId/recipient-reject-request',
  validateParams(recipientRejectRequestParamsSchema),
  recipientRejectRequest(),
);

deliveries.patch(
  '/deliveries/:deliveryId/sender-accept-fare',
  validateParams(senderAcceptDeliveryFareParamsSchema),
  senderAcceptDeliveryFare(),
);

export default deliveries;
