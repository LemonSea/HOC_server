const debug = require('debug')('app:server');
const commonServer = require('./commonServer');

const Course = require('../models/course');

class courseServer extends commonServer {
  constructor() {
    super();
  }
}

module.exports = courseServer;