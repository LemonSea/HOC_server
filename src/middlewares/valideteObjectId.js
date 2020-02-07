const mongoose = require('mongoose');
const logger = require('../middlewares/logger');

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    logger.error('Invalid ID');
    return res.status(400).send('Invalid ID');
  }
  next()
}