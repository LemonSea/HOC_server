const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');

const userController = require('../../controllers/userController');
const { logUpValidate } = require('../../validations/user');

module.exports = (app) => {

  app.use('/users', route);

  route.post('/',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['name', 'email', 'password']);

        const { error } = logUpValidate(user);
        if (error) return res.status(400).send(error.details[0].message)

        const result = await userController.logUp(user);
        if(!result) return res.status(400).send('User already registered.')

        res.status(201).json(result)
      } catch (e) {
        throw e;
      }
    })
}


