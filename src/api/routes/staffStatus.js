const route = require('express').Router();
const debug = require('debug')('app:route');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const processGet = require('../../tools/processGet');

const staffStatusController = require('../../controllers/staffStatusController');


module.exports = (app) => {

  app.use('/staffStatus', route);

  route.get('/',
    async (req, res, next) => {
      try {
        const query = processGet(req.query);
        const result = await staffStatusController.findList(query);
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
    // isAuth,
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['name', 'describe', 'creator']);

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
  // app.use(errors());
}
