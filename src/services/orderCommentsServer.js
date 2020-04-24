const debug = require('debug')('app:orderComments');
const orderCommentsModel = require('../models/orderComments');
const commonServer = require('./commonServer');

class orderCommentsServer extends commonServer {
  constructor() {
    super();
  }

}

module.exports = orderCommentsServer;
