const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');

const authController = require('../../controllers/authController');
const { authValidate } = require('../../validations/user');

module.exports = (app) => {

  app.use('/auth', route);

  route.post('/',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['email', 'password']);

        const { error } = authValidate(user);
        if (error) return res.status(400).send(error.details[0].message)

        const result = await authController.authUser(user);
        if(!result) return res.status(400).send('Invalid email or password!')

        res.status(200).json(result)
      } catch (e) {
        throw e;
      }
    })
}


