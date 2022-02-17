import Joi from 'joi';

const deliveryIdParamsSchema = Joi.object({
  deliveryId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

export default deliveryIdParamsSchema;
