const debug = require('debug')('app:server');
const commonServer = require('./commonServer');

const userModel = require('../models/user');

class userServer extends commonServer {
  constructor() {
    super();
  }

  async findList(rest, pageSize, pageNum) {
    const num = await userModel.find(rest).count();
    const list = await userModel
      .find(rest)
      // .populate('company', 'name')
      .populate('role', 'name menu')
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize).exec()
      // debug(num)
      debug(rest)
      // debug(list)
    return {
      num,
      pageSize,
      pageNum,
      list
    };
  }

  async validationEmile(user) {
    const result = await userModel.findOne({ email: user.email })
    if (result) return false;
    return true;
  }

  async validationAccount(user) {
    // debug(user)
    const result = await userModel.findOne({ account: user.account, isDelete:false })
    if (result) return result;
    return false;
  }

  async validationAdmin(user) {
    // debug(user)
    const result = await userModel
      .findOne({ account: user.account, isAdmin: true, status: 1, isDelete:false })
      .populate('role', 'name menu')
    if (result) return result;
    return false;
  }
}



module.exports = userServer;