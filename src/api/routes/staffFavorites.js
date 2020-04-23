const route = require('express').Router();
const debug = require('debug')('app:route-staffFavorites');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const staffFavoritesController = require('../../controllers/staffFavoritesController');


module.exports = (app) => {

  app.use('/staffFavorites', route);

  /**
   * client
   */
  route.get('',
    async (req, res, next) => {
      try {
        const item = _.pick(req.query, ['user','pageNum', 'pageSize']);
        // debug(item)
        const result = await staffFavoritesController.findList(item);
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
        const item = _.pick(req.body, ['data']);
        // debug(item)
        const result = await staffFavoritesController.addStaffFavorites(item.data);
        // debug(result)
        if(!result) {
          return res.status(200).json(
            {
              "status": 2,
              "data": '请勿重复收藏！'
            }
          )
        }
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

  route.delete('/',
  async (req, res, next) => {
    try {
      const item = _.pick(req.body, ['data']);
      // debug(item)
      const result = await staffFavoritesController.deleteStaffFavorites(item.data);
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

  route.get('/allList',
    async (req, res, next) => {
      try {
        const item = _.pick(req.query, ['user']);
        debug(item)
        const result = await staffFavoritesController.findAllList(item);
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

