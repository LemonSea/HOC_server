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
      .populate('Officer')
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize).exec()
    // debug(num)
    // debug(rest)
    // debug(list)
    return {
      num,
      pageSize,
      pageNum,
      list
    };
  }
  
  async recommendList(rest, limit) {
    const list = await companyModel
      .find(rest)
      // .populate('company', 'name')
      .populate('Officer')
      .limit(limit).exec()
    // debug(num)
    // debug(limit)
    // debug(list)
    return {
      limit,
      list
    };
  }

}

module.exports = companyServer;