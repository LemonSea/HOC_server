const route = require('express').Router();
const debug = require('debug')('app:route');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const { createCourse } = require('../../controllers/courseController');
const getProcess = require('../tools/getProcess');

const courseModel = require('../../models/course');

module.exports = (app) => {

  app.use('/courses', route);

  route.get('/',
    async (req, res, next) => {
      // getProcess(req.query)

      const record = await courseModel
        .find(req.query)
        .skip()
        .limit()
        .sort()
        .select();
        // .count();
      debug(record);
      res.json(record);
    })

  route.post('/',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        author: Joi.string(),
        isPublished: Joi.boolean().required(),
        tags: Joi.array(),
        category: Joi.string().required()
      }),
    }),
    async (req, res, next) => {
      const result = await createCourse(req.body);
      res.status(201).json(result)
    })

  app.use(errors());
}
