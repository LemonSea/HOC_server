const route = require('express').Router();
const debug = require('debug')('app:route');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const { createCourse } = require('../../controllers/courseController');

module.exports = (app) => {

  app.use('/course', route);

  route.get('/', (req, res, next) => {
    res.status(200).json({
      code: 0,
      course: {
        name: 'math'
      }
    })
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
      res.json(result)
    })

    app.use(errors());
}
