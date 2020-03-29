const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const processGet = require('../../tools/processGet');

const staffController = require('../../controllers/staffController');


module.exports = (app) => {

  app.use('/staff', route);

  route.get('/admin/list',
    isAuth,
    async (req, res, next) => {
      try {
        // debug(req.query)
        const item = _.pick(req.query, ['pageNum', 'pageSize']);
        const result = await staffController.findList(item);
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
  route.get('/admin/searchList',
    isAuth,
    async (req, res, next) => {
      try {
        // debug(req.query)
        const item = _.pick(req.query, ['pageNum', 'pageSize', 'searchType', 'searchName']);
        const result = await staffController.findList(item);
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

  route.post('/admin/list',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['data']);
        const result = await staffController.addStaff(item.data);
        // debug(result)
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

  route.post('/admin/staffStatus',
    isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'status']);
        const result = await staffController.updateStatus(item._id, item.status);
        // debug(item)
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
    
    route.put('/',
    isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'data']);
        // debug(item)
        const result = await staffController.updateStaffStatus(item._id, item.data);
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

  route.delete('/',
  isAuth,
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const result = await staffController.deleteStaffStatus(id);
      // debug(result)
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
}
