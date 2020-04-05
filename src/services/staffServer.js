const debug = require('debug')('app:server');
const staffModel = require('../models/staff');
const commonServer = require('./commonServer');

const Staff = require('../models/staff');

class staffServer extends commonServer {
  constructor() {
    super();
  }

  async findList(rest, pageSize, pageNum) {
    const num = await Staff.find(rest).count();
    const list = await Staff
        .find(rest)
        .populate('staffStatus', 'name')
        // .populate('staffStatus', 'name')
        .populate('company')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize).exec()
    // debug(list)
    return {
      num,
      pageSize,
      pageNum,
      list
    };
  }

  
  async recommendList(rest, limit) {
    const list = await staffModel
      .find(rest)
      // .populate('company', 'name')
        .populate('staffStatus', 'name')
        .populate('company')
      .limit(limit).exec()
    // debug(num)
    // debug(limit)
    debug(list)
    return {
      limit,
      list
    };
  }

}



module.exports = staffServer;