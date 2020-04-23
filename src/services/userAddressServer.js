const debug = require('debug')('app:userAddress');
const userAddressModel = require('../models/userAddress');
const commonServer = require('./commonServer');

class userAddressServer extends commonServer {
  constructor() {
    super();
  }

  async findList(rest) {
    const result = await userAddressModel
        .find(rest)
    // debug(result)
    return result;
  }
}

module.exports = userAddressServer;
