const Router = require('express').Router;

const course = require('./routes/courses');
const user = require('./routes/users');
const auth = require('./routes/auth');

module.exports = () => {
  const app = Router();

  course(app);
  user(app);
  auth(app);

  return app
}