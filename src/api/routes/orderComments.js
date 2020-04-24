const route = require('express').Router();
const debug = require('debug')('app:route-orderComments');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const orderCommentsController = require('../../controllers/orderCommentsController');


module.exports = (app) => {

  app.use('/orderComments', route);

  /**
   * client
   */
  // 增加评论
  route.post('/',
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['data']);
        // debug(item)
        const result = await orderCommentsController.addOrderComments(item.data);
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
}

