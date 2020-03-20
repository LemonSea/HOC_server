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
        const user = _.pick(req.body, ['account', 'password']);

        const { error } = signInValidate(user);
        if (error) return res.status(400).json(
          {
            "status" : 1,
            "msg": error.details[0].message
          })

        const result = await authController.SignIn(user);
        if (!result) return res.status(400).json({
          "status" : 1,
          "msg": 'Invalid account or password!'
        })

        const { record, token } = result;
        res.status(200).header('x-auth-token', token).json(
          {
            "status" : 0,
            "data": record,
            "x-auth-token": token
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    })

  route.get('/logout',
    async (req, res, next) => {
      try {
        res.status(200).header('x-auth-token', '').json('you are logout!');
      } catch (e) {
        logger.error('%o', e);
        next(e);
      }
    }
  )
}


