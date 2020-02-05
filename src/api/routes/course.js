const route = require('express').Router();
const debug = require('debug')('app:route');

const courseModel = require('../../models/course');

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

  route.post('/', (req, res, next) => {
    debug(req.body);
    const result = courseModel.create(req.body)
    res.json(result)
  })
 
}
