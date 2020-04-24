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
        .populate('serviceAddress')
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

  async findOrderDetail(rest) {
    const result = await OrderModel
        .find(rest)
        .populate('employee')
        .populate('user')
        .populate('company')
        .populate('serviceAddress')
    // debug(result)
    return result;
  }

}


module.exports = OrderServer;