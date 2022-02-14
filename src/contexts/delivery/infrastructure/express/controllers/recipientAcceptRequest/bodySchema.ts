import Joi from 'joi';

const recipientAcceptRequestBodySchema = Joi.object({
  recipientLocation: Joi.object({
    address: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
  }),
});

export default recipientAcceptRequestBodySchema;
