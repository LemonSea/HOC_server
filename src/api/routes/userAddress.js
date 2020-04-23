const route = require('express').Router();
const debug = require('debug')('app:route-userAddress');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const userAddressController = require('../../controllers/userAddressController');


module.exports = (app) => {

  app.use('/userAddress', route);

  /**
   * client
   */
  route.get('',
    async (req, res, next) => {
      try {
        const item = _.pick(req.query, ['user']);
        // debug(item)
        const result = await userAddressController.findList(item.user);
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
        const result = await userAddressController.addUserAddress(item.data);
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
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['_id', 'data']);
        // debug(item)
        const result = await userAddressController.updateUserAddress(item._id, item.data);
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

  route.put('/setDefault',
    async (req, res, next) => {
      try {
        const item = _.pick(req.body, ['oldId', 'newId']);
        // debug(item)
        const result = await userAddressController.setDefault(item.oldId, item.newId);
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
  async (req, res, next) => {
    try {
      const _id = req.body._id;
      const result = await userAddressController.deleteUserAddress(_id);
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

