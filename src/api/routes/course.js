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
      // http://localhost:8080/api/v1/courses?sort=%2Bname,-date&select=name,date,isPublished&offset=-1&limit=-2&name=xu&price=<=20
      const { sort, select, limit, skip, count, rest } = getProcess(req.query)
      debug(sort)
      debug(select)
      debug(limit)
      debug(skip)
      debug(count)
      debug(rest)
      const record = await courseModel
        .find(rest)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(select);
      // .count();
      // res.json(req.query);
      res.json(record);
    })

  route.post('/',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        author: Joi.string(),
        isPublished: Joi.boolean().required(),
        price: Joi.number(),
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
