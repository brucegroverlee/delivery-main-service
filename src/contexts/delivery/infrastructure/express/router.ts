import express from 'express';
import validateBody from '../../../shared/infrastructure/express/validators/validateBody';
import validateParams from '../../../shared/infrastructure/express/validators/validateParams';

import deliveryIdParamsSchema from './deliveryIdParamsSchema';

import createDeliveryController from './controllers/createDelivery';
import createDeliveryBodySchema from './controllers/createDelivery/bodySchema';

import recipientAcceptRequestController from './controllers/recipientAcceptRequest';
import recipientAcceptRequestParamsSchema from './controllers/recipientAcceptRequest/paramsSchema';
import recipientAcceptRequestBodySchema from './controllers/recipientAcceptRequest/bodySchema';

import recipientRejectRequest from './controllers/recipientRejectRequest';
import recipientRejectRequestParamsSchema from './controllers/recipientRejectRequest/paramsSchema';

import senderAcceptDeliveryFare from './controllers/senderAcceptDeliveryFare';
import senderAcceptDeliveryFareParamsSchema from './controllers/senderAcceptDeliveryFare/paramsSchema';

import senderRejectDeliveryFare from './controllers/senderRejectDeliveryFare';

import carrierArriveSenderLocation from './controllers/carrierArriveSenderLocation';

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

deliveries.patch(
  '/deliveries/:deliveryId/sender-reject-fare',
  validateParams(deliveryIdParamsSchema),
  senderRejectDeliveryFare(),
);

deliveries.patch(
  '/deliveries/:deliveryId/carrier-arrive-sender-location',
  validateParams(deliveryIdParamsSchema),
  carrierArriveSenderLocation(),
);

export default deliveries;
