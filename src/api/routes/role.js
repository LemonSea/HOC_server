const route = require('express').Router();
const debug = require('debug')('app:route-role');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const processGet = require('../../tools/processGet');

const roleController = require('../../controllers/roleController');


module.exports = (app) => {

  app.use('/role', route);

  route.get('/admin/list',
    // isAuth,
    async (req, res, next) => {
      try {
        const result = await roleController.findList();
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

  route.post('/admin',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['data']);
        const result = await roleController.addRole(item.data);
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

    route.put('/auth',
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'menu']);
        // debug(item)
        const result = await roleController.updateRole(item._id, item.menu);
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

  route.delete('/',
  isAuth,
  async (req, res, next) => {
    try {
      const _id = req.body._id;
      // debug(req.body)
      const result = await roleController.deleteRole(_id);
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

}