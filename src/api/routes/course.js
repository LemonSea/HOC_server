const route = require('express').Router();
const debug = require('debug')('app:route');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const courseController = require('../../controllers/courseController');
const getProcess = require('../tools/getProcess');

const courseModel = require('../../models/course');

module.exports = (app) => {

  app.use('/courses', route);

  route.get('/',
    async (req, res, next) => {
      // http://localhost:8080/api/v1/courses?sort=%2Bname,-date&select=name,date,isPublished&offset=-1&limit=-2&name=xu&price=<=20
      // const { sort, select, limit, skip, count, rest } = getProcess(req.query)
      const query = getProcess(req.query);
      // const record = await courseModel
      //   .find(rest)
      //   .skip(skip)
      //   .limit(limit)
      //   .sort(sort)
      //   .select(select);
      // .count();
      // res.json(req.query);      
      const result = await courseController.findCourse(query);
      res.status(200).json(result);
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
      const result = await courseController.createCourse(req.body);
      res.status(201).json(result)
    })

  app.use(errors());
}
