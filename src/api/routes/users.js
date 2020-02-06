const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');

const isAuth = require('../../middlewares/isAuth');

const userController = require('../../controllers/userController');
const userModel = require('../../models/user');

module.exports = (app) => {

  app.use('/users', route);

  route.get('/me', isAuth,
    async (req, res, next) => {
      const record = await userController.getMe(req.currentUser.id);
      res.status(200).send(record)
    }
  )

}


