const Joi = require('@hapi/joi');

function addAdminValidate(data) {
  const schema = Joi.object({
    password: Joi.string().required(),
    account: Joi.string().min(3).max(255).required(),
    isAdmin: Joi.boolean().required()
  })

  return schema.validate(data)
}

function adminLoginValidate(data) {
  const schema = Joi.object({
    password: Joi.string().required(),
    account: Joi.string().min(3).max(255).required()
  })

  return schema.validate(data)
}

module.exports = {
  addAdminValidate,
  adminLoginValidate
}