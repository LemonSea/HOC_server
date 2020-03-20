const route = require('express').Router();
const debug = require('debug')('app:route-authority');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const authorityController = require('../../controllers/authorityController');

module.exports = (app) => {

  app.use('/authorities', route);

  route.get('/',
    async (req, res, next) => {
      try {
        const result = await authorityController.findAuthority();
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
    async (req, res, next) => {
      try {
        const authMenuList = _.pick(req.body, ['menuList']);

        const result = await authorityController.addAuthority(authMenuList);

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

}


