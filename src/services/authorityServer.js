const debug = require('debug')('app:server');
const userModel = require('../models/user');
const commonServer = require('./commonServer');

class authorityServer extends commonServer {
  constructor() {
    super();
  }
}

module.exports = authorityServer;