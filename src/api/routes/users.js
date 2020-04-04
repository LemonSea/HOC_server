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

  // 获取当前账号信息
  route.get('/me',
    // isAuth,
    async (req, res, next) => {
      const record = await userController.getMe(req.currentUser.id);
      res.status(200).send(record)
    }
  )

  /**
   * crud
   */

  // 管理员登录
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
        debug(result)
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

  // 获取用户列表
  route.get('/admin/list',
    isAuth,
    async (req, res, next) => {
      try {
        // debug(req.query)
        const item = _.pick(req.query, ['pageNum', 'pageSize']);
        const result = await userController.findList(item);
        res.status(200).json(
          {
            "status": 0,
            "data": result
          }
        );
      } catch (e) {
        throw e;
      }
    })

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

  // 修改账号状态
  route.put('/admin/status',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'status']);
        // debug(item)
        const result = await userController.updateStatus(item._id, item.status);
        res.status(200).json(
          {
            "status": 0,
            "data": result
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    }
  )
  // 修改账号角色
  route.put('/admin/role',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'role']);
        debug(item)
        const result = await userController.updateRole(item._id, item.role);
        res.status(200).json(
          {
            "status": 0,
            "data": result
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    }
  )

  route.delete('/admin',
    isAuth,
    async (req, res, next) => {
      try {
        const _id = req.body._id;
        debug(req.body)
        const result = await userController.deleteById(_id);
        debug(result)
        res.status(200).json(
          {
            "status": 0,
            "data": result
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    })

  /**
   * client
   */

  // 公司注册
  // 添加公司负责人
  route.post('/head',
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['data']);
        const result = await userController.addHead(item.data);
        // debug(item)
        if (!result) return res.status(400).json(
          {
            "status": 1,
            "msg": 'User already registered.'
          })

        res.status(201).json(
          {
            "status": 0,
            "data": result
          }
        )
      } catch (e) {
        logger.error('%o', e);
        next(e)
      }
    }
  )

  // 用户登录
  route.post('/login',
    async (req, res, next) => {
      try {
        const user = _.pick(req.body, ['account', 'password']);

        const { error } = userValidate.adminLoginValidate(user);
        if (error) return res.status(400).json(
          {
            "status": 1,
            "msg": error.details[0].message
          })

        const result = await userController.userLogin(user);
        debug(result)
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


  // 用户注册
  route.post('/register',
    async (req, res, next) => {
      try {
        const user = req.body;
        // const user = _.pick(req.body, ['data']);
        // debug(user)

        // const { error } = userValidate.addAdminValidate(user);
        // if (error) return res.status(400).json(
        //   {
        //     "status": 1,
        //     "msg": error.details[0].message
        //   }
        // )

        const result = await userController.userRegister(user);
        if (!result) return res.status(400).json(
          {
            "status": 1,
            "msg": 'User already registered.'
          })

          const { record, token } = result;
          // debug(record)
          res.status(201).header('x-auth-token', token).json(
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

}


