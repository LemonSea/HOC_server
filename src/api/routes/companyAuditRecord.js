const route = require('express').Router();
const debug = require('debug')('app:route-companyAuditRecord');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const companyAuditRecordController = require('../../controllers/companyAuditRecordController');

module.exports = (app) => {

  app.use('/companyAuditRecord', route);

  route.post('/',
    async (req, res, next) => {
      try {
        const data = _.pick(req.body, ['data']);

        debug(data)
        const result = await companyAuditRecordController.addCompanyAuditRecord({company: data.data});
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