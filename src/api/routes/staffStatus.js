const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const processGet = require('../../tools/processGet');

const staffStatusController = require('../../controllers/staffStatusController');
const staffStatusModel = require('../../models/staffStatus');


module.exports = (app) => {

  app.use('/staffStatus', route);

  route.get('/',
    isAuth,
    async (req, res, next) => {
      try {
        const result = await staffStatusController.findList();
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
  route.get('/type',
    isAuth,
    async (req, res, next) => {
      try {
        const result = await staffStatusController.getStaffType();
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

  route.post('/',
    isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['data']);
        const result = await staffStatusController.addStaffStatus(item);
        debug(result)
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
        const result = await staffStatusController.updateStaffStatus(item._id, item.data);
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
      const result = await staffStatusController.deleteStaffStatus(id);
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
  
  route.get('/list',
  async (req, res, next) => {
    try {
      const result = await staffStatusModel
        .find()
        .populate('creator')
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
