const debug = require('debug')('app:server');
const staffStatusModel = require('../models/staffStatus');
const commonServer = require('./commonServer');

const Course = require('../models/course');

class staffStatusServer extends commonServer {
  constructor() {
    super();
  }
}



module.exports = staffStatusServer;