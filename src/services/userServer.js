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
    if(result) return false;
    return true;
  }
}



module.exports = userServer;