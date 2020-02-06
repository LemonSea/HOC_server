const Joi = require('@hapi/joi');

function signUpValidate(data) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email()
  })
  return schema.validate(data)
}

function signInValidate(data) {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email()
  })

  return schema.validate(data)
}



module.exports = {
  signUpValidate,
  signInValidate
}