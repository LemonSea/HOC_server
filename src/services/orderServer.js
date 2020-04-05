const debug = require('debug')('app:server-order');
const commonServer = require('./commonServer');

const OrderModel = require('../models/order');

class OrderServer extends commonServer {
  constructor() {
    super();
  }
  
  // async findList(rest) {
  //   const result = await RoleModel
  //       .find(rest)
  //       .populate('creator', 'account nickname')
  //   // debug(result)
  //   return result;
  //   if (result) return false;
  //   return true;
  // }

}


module.exports = OrderServer;