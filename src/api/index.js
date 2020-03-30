const Router = require('express').Router;

const course = require('./routes/courses');
const upload = require('./routes/upload');

const user = require('./routes/users');
const auth = require('./routes/auth');
const authorities = require('./routes/authorities');
const staffStatus = require('./routes/staffStatus');
const staff = require('./routes/staff');
const role = require('./routes/role');

module.exports = () => {
  const app = Router();

  course(app);
  user(app);
  auth(app);
  authorities(app);
  staffStatus(app);
  staff(app);
  role(app);

  return app
}