const debug = require('debug')('app:server-role');
const commonServer = require('./commonServer');

const RoleModel = require('../models/role');

class RoleServer extends commonServer {
  constructor() {
    super();
  }
  
  async findList(rest) {
    const result = await RoleModel
        .find(rest)
        .populate('creator', 'account nickname')
    // debug(result)
    return result;
    if (result) return false;
    return true;
  }

}


module.exports = RoleServer;