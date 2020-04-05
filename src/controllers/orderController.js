const debug = require('debug')('app:controller-order');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const orderModel = require('../models/order');
const companyModel = require('../models/company');
const orderServer = require('../services/orderServer');
const companyServer = require('../services/companyServer');

// dependence injected
const orderServerInstance = Container.get(orderServer);
const companyServiceInstance = Container.get(companyServer);


// 获取订单
async function findList(item) {
  try {
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    let rest = { isDelete: false }

    // if (item.searchName) {
    //   if (item.searchType === 'name') {
    //     const reg = new RegExp(item.searchName, 'i') //不区分大小写
    //     rest[item.searchType] = { $regex: reg }
    //   }
    // }

    if (item.user !== '') {
      // debug(item)
      // 获得对应用户的公司
      const firmRest = { isDelete: false, Officer: item.user }
      // debug('firmRest', firmRest)
      const company = await companyServiceInstance.findList(companyModel, firmRest);
      // debug('company', company)
      const rest = { isDelete: false, company: company[0]._id }
      // debug('rest', rest)
      const result = await staffServiceInstance.findList(rest, pageSize, pageNum);
  
      // debug(result)
      return result;
    }

    // debug(rest)
    const result = await orderServerInstance.findList(rest, pageSize, pageNum);
    // debug(result)

    return result;
  } catch (ex) {
    throw ex
  }
}

// 添加订单
async function addOrder(data) {
  try {
    debug(data)
    const record = await orderServerInstance.createOne(orderModel, data);
    return record;
  } catch (ex) {
    throw ex
  }
}

// 更新服务人员类型
async function updateStatus(_id, status) {
  try {
    // debug(_id, status)
    const record = await orderServerInstance.updateById(orderModel, _id, { status });
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}


// 用户获取订单
async function findListUser(item) {
  try {
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    let rest = { isDelete: false, user: item.user }
    // debug(rest)
    const result = await orderServerInstance.findList(rest, pageSize, pageNum);
    // debug(result)

    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addOrder,
  findList,
  updateStatus,
  findListUser
}