const debug = require('debug')('app:server');
const userModel = require('../models/user');
const commonServer = require('./commonServer');

class authServer extends commonServer {
  constructor() {
    super();
  }

  async findUser(user) {
    // debug(user)
    const result = await userModel.findOne({ account: user.account })
    if(result) return result;
    return false;
  }
}



module.exports = authServer;