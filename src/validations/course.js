const Joi = require('@hapi/joi');

function createValidate(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string(),
    isPublished: Joi.boolean().required(),
    price: Joi.number().min(0).max(10000),
    tags: Joi.array(),
    category: Joi.string().required().min(1).max(50)
  })

  return schema.validate(data)
}

exports.createValidate = createValidate;