const debug = require('debug')('app:server');
const userModel = require('../models/user');
const commonServer = require('./commonServer');

const Course = require('../models/course');

class userServer extends commonServer {
  constructor() {
    super();
  }

  async validationEmile(user) {
    const result = await userModel.findOne({ email: user.email })
    if (result) return false;
    return true;
  }

  async validationAccount(user) {
    // debug(user)
    const result = await userModel.findOne({ account: user.account })
    if (result) return result;
    return false;
  }

  async validationAdmin(user) {
    // debug(user)
    const result = await userModel.findOne({ account: user.account, isAdmin: true })
    if (result) return result;
    return false;
  }
}



module.exports = userServer;