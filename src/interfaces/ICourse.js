const Joi = require('@hapi/joi');

function createValidate(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string(),
    isPublished: Joi.boolean().required(),
    price: Joi.number(),
    tags: Joi.array(),
    category: Joi.string().required()
  })

  return schema.validate(data)
}

exports.createValidate = createValidate;