const route = require('express').Router();
const debug = require('debug')('app:route-order');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const processGet = require('../../tools/processGet');

const orderController = require('../../controllers/orderController');


module.exports = (app) => {

  app.use('/order', route);

  route.post('/add',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['data']);
        debug(item)
        const result = await orderController.addOrder(item.data);
        debug(req.body)
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
    })

  // 获取订单
  route.get('/admin/list',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.query, ['pageNum', 'pageSize', 'user']);
        debug(item)
        const result = await orderController.findList(item);
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

  route.put('/admin/orderStatus',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'status']);
        debug(item)
        const result = await orderController.updateStatus(item._id, item.status);
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
    }
  )

  /**
   * client
   */
  // 获取订单
  route.get('/user/list',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.query, ['pageNum', 'pageSize', 'user']);
        debug(item)
        const result = await orderController.findListUser(item);
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

}