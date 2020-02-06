const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../middlewares/logger');

const debug = require('debug')('app:db')

module.exports = async () => {
  try {
    const connection = await mongoose.connect(config.databaseURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    logger.info('Success to connect MongoDB!')
    return connection.connection.db;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};