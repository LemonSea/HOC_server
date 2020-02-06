
const debug = require('debug')('middleWare:error');
const logger = require('../middlewares/logger');

module.exports = function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
}