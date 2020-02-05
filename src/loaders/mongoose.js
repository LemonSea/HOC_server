const mongoose = require('mongoose');
const config = require('../config');
const dbDebugger = require('debug')('app:db')

module.exports = async () => {
  try {
    const connection = await mongoose.connect(config.databaseURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
    dbDebugger('connect mongodb success!');
    return connection.connection.db;
  } catch (e) {
    throw e;
  }
};