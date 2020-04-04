const route = require('express').Router();
const debug = require('debug')('app:route-company');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

const companyController = require('../../controllers/companyController');

module.exports = (app) => {

  app.use('/company', route);

  route.get('/',
    async (req, res, next) => {
      try {
        const result = await companyController.findAuthority();
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

  // 获取公司负责人列表
  route.get('/admin/officer',
    isAuth,
    async (req, res, next) => {
      try {
        // debug(req.query)
        const item = _.pick(req.query, ['pageNum', 'pageSize']);
        const result = await companyController.findOfficerList(item);
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
        const data = _.pick(req.body, ['data']);
        debug(data)
        const result = await companyController.addCompany(data.data);

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