const debug = require('debug')('app:server-company');
const companyModel = require('../models/company');
const commonServer = require('./commonServer');

class companyServer extends commonServer {
  constructor() {
    super();
  }

  // 分页获取公司列表
  async findList(rest, pageSize, pageNum) {
    debug('rest', rest)
    const num = await companyModel.find(rest).count();
    const list = await companyModel
      .find(rest)
      // .populate('company', 'name')
      .populate('Officer')
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize).exec()
    // debug(num)
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

  // 获取公司详情
  async findCompanyDetail(rest) {
    const result = await companyModel
        .find(rest)
        .populate('Officer')
    // debug(result)
    return result;
  }
}

module.exports = companyServer;