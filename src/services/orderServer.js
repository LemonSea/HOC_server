const debug = require('debug')('app:server-order');
const commonServer = require('./commonServer');

const OrderModel = require('../models/order');

class OrderServer extends commonServer {
  constructor() {
    super();
  }
  
  async findList(rest, pageSize, pageNum) {
    const num = await OrderModel.find(rest).count();
    const list = await OrderModel
        .find(rest)
        .populate('employee')
        .populate('user')
        .populate('company')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize).exec()
    // debug(rest)
    return {
      num,
      pageSize,
      pageNum,
      list
    };
  }

}


module.exports = OrderServer;