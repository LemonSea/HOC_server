const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const userValidate = require('../../validations/user');
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

  route.post('/admin/login',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['account', 'password']);

        const { error } = userValidate.adminLoginValidate(user);
        if (error) return res.status(400).json(
          {
            "status": 1,
            "msg": error.details[0].message
          })

        const result = await userController.adminLogin(user);
        if (!result) return res.status(400).json({
          "status": 1,
          "msg": 'Invalid account or password!'
        })

        const { record, token } = result;
        res.status(200).header('x-auth-token', token).json(
          {
            "status": 0,
            "data": record,
            "token": token
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    }
  )

  // 添加管理员
  route.post('/admin/user',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['account', 'password', 'isAdmin']);

        const { error } = userValidate.addAdminValidate(user);
        if (error) return res.status(400).json(
          {
            "status": 1,
            "msg": error.details[0].message
          }
        )

        const result = await userController.addAdmin(user);
        if (!result) return res.status(400).json(
          {
            "status": 1,
            "msg": 'User already registered.'
          })

        const { record } = result;
        res.status(201).json(
          {
            "status": 0,
            "data": record
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    }
  )

}


