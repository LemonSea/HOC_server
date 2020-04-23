const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../middlewares/logger');

const debug = require('debug')('app:db')

module.exports = async () => {
  try {
    let dbUrl = (process.env.NODE_ENV === 'test') ? config.databaseTestURL : config.databaseURL;
    const connection = await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      // replicaSet: 'rs' 
    });
    // const connection = await mongoose.connect(dbUrl, { replicaSet: 'rs' });
    logger.info('Success to connect MongoDB!')
    return connection.connection.db;   
  } catch (e) {
    logger.error(e);
    throw e;
  }
};