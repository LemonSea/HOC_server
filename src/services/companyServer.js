const debug = require('debug')('app:server-company');
const companyModel = require('../models/company');
const commonServer = require('./commonServer');

class companyServer extends commonServer {
  constructor() {
    super();
  }
  async findList(rest, pageSize, pageNum) {
    const num = await companyModel.find(rest).count();
    const list = await companyModel
      .find(rest)
      // .populate('company', 'name')
      .populate('Officer', 'nickname account status')
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
}

module.exports = companyServer;