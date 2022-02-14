import Joi from 'joi';

const createDeliveryBodySchema = Joi.object({
  senderId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  senderLocation: Joi.object({
    address: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
  }),
  recipientId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  recipientLocation: Joi.object({
    address: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
  }),
});

export default createDeliveryBodySchema;
