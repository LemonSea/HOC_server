const route = require('express').Router();
const debug = require('debug')('app:route');
const logger = require('../../middlewares/logger');
const _ = require('lodash');

const authController = require('../../controllers/authController');
const { signInValidate, signUpValidate } = require('../../validations/auth');

module.exports = (app) => {

  app.use('/auth', route);

  route.post('/signup',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['name', 'email', 'password']);

        const { error } = signUpValidate(user);
        if (error) return res.status(400).json(error.details[0].message)

        const result = await authController.SignUp(user);
        if (!result) return res.status(400).json('User already registered.')

        const { record, token } = result;
        res.status(201).header('x-auth-token', token).json(record)
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    })


  route.post('/signin',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['email', 'password']);

        const { error } = signInValidate(user);
        if (error) return res.status(400).json(error.details[0].message)

        const result = await authController.SignIn(user);
        if (!result) return res.status(400).json('Invalid email or password!')

        const { record, token } = result;
        res.status(200).header('x-auth-token', token).json(record)
        // res.status(200).json(token)
        // throw new Error('Route error');
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    })
}


