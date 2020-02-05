const route = require('express').Router();
const debug = require('debug')('app:route');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const courseController = require('../../controllers/courseController');
const processGet = require('../tools/processGet');

const courseModel = require('../../models/course');

module.exports = (app) => {

  app.use('/test', route);

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
      try {
        const result = await courseController.createCourse(req.body);
        res.status(201).json(result)
      } catch (e) {
        throw e;
      }
    })

  route.get('/',
    async (req, res, next) => {
      try {
        // http://localhost:8080/api/v1/courses?sort=%2Bname,-date&select=name,date,isPublished&offset=-1&limit=-2&name=xu&price=<=20
        const query = processGet(req.query);
        // const result = await courseController.findCourse(query);
        debug(query)
        const result = await courseModel
          .find({})
          .skip(0)
          .limit(0)
          .sort({})
          .select({})
          .count();
        debug(result)
        res.status(200).json(result);
      } catch (e) {
        throw e;
      }
    })

  route.get('/:id',
    async (req, res, next) => {
      try {
        const id = req.params.id;
        debug(id)
        const result = await courseController.findCourseById(id);
        res.status(200).json(result);
      } catch (e) {
        throw e;
      }
    }
  )

  route.put('/:id',
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const dec = req.body;
        const result = await courseController.updateCourseById(id, dec);
        res.status(200).json(result);
      } catch (e) {
        throw e;
      }
    }
  )

  route.put('/',
    async (req, res, next) => {
      try {
        const query = req.body.query;
        const dec = req.body.dec;
        const result = await courseController.updateOneCourse(query, dec);
        res.status(200).json(result);
      } catch (e) {
        throw e;
      }
    }
  )

  route.delete('/',
    async (req, res, next) => {
      try {
        const query = req.body.query;
        const result = await courseController.deleteOneCourse(query);
        res.status(200).json(result);
      } catch (e) {
        throw e;
      }
    }
  )

  route.delete('/:id',
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await courseController.deleteCourseById(id);
      res.status(200).json(result);
    } catch (e) {
      throw e;
    }
  })

  app.use(errors());
}
