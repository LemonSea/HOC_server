const debug = require('debug')('app:controller-role');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const orderModel = require('../models/order');
const orderServer = require('../services/orderServer');

// dependence injected
const orderServerInstance = Container.get(orderServer);

async function addOrder(data) {
  try {
    debug(data)
    const record = await orderServerInstance.createOne(orderModel, data);
    return record;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addOrder
}