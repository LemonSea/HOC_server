const Router = require('express').Router;

const course = require('./routes/courses');
const upload = require('./routes/upload');

const user = require('./routes/users');
const auth = require('./routes/auth');
const authorities = require('./routes/authorities');
const staffStatus = require('./routes/staffStatus');
const staff = require('./routes/staff');
const role = require('./routes/role');

const company = require('./routes/company');
const companyAuditRecord = require('./routes/companyAuditRecord');

const order = require('./routes/order');

module.exports = () => {
  const app = Router();

  upload(app);

  course(app);
  user(app);
  auth(app);
  role(app);
  authorities(app);
  staffStatus(app);
  staff(app);
  company(app);
  companyAuditRecord(app);
  order(app);

  return app
}