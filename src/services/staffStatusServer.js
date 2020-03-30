const debug = require('debug')('app:server');
const staffStatusModel = require('../models/staffStatus');
const commonServer = require('./commonServer');

const StaffStatus = require('../models/staffStatus');

class staffStatusServer extends commonServer {
  constructor() {
    super();
  }
  
  async findList(rest) {
    const result = await StaffStatus
        .find(rest)
        .populate('creator', 'account nickname')
    // debug(result)
    return result;
    if (result) return false;
    return true;
  }
  
  async getStaffType(rest) {
    const result = await StaffStatus
        .find(rest)
        .select('name _id')
    // debug(result)
    return result;
    if (result) return false;
    return true;
  }
}



module.exports = staffStatusServer;