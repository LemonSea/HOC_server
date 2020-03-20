
const debug = require('debug')('middleWare:error');
const logger = require('../middlewares/logger');

module.exports = function (err, req, res, next) {
  debug(err)
  res.status(err.status || 500);
  debug(err.status)
  res.json({
    errors: {
      message: err.message,
    },
  });
}