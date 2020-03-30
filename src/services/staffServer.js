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
        .skip((pageNum-1)*pageSize)
        .limit(pageSize).exec()
    return {
      num,
      pageSize,
      pageNum,
      list
    };
  }

}



module.exports = staffServer;