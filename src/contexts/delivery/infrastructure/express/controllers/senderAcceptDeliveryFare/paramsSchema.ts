import Joi from 'joi';

const senderAcceptDeliveryFareParamsSchema = Joi.object({
  deliveryId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

export default senderAcceptDeliveryFareParamsSchema;
