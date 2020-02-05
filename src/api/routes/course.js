const { celebrate, Joi } = require('celebrate');
const route = require('express').Router();

let courses = [
  { "name": "English", "price": "2000" },
  { "name": "Chinese", "price": "1000" },
  { "name": "math", "price": "3000" },
  { "name": "English", "price": "4000" }
];

module.exports = (app) => {

  app.use('/courses', route);

  route.get(
    '/',
    (req, res, next) => {
      res.status(200).json({
        "message": "success!",
        data: courses
      })
    }
  )
}
