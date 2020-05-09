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
      const company = await companyServiceInstance.findList(firmRest);
      debug('company', company)
      const rest = { isDelete: false, company: company.list[0]._id }
      // debug('rest', rest)
      const result = await orderServerInstance.findList(rest, pageSize, pageNum);

      // debug(result)
      return result;
    }
    // if (item.user !== '') {
    //   // debug(item)
    //   // 获得对应用户的公司
    //   const firmRest = { isDelete: false, Officer: item.user }
    //   // debug('firmRest', firmRest)
    //   const company = await companyServiceInstance.findList(firmRest);
    //   // debug('company', company)
    //     rest['company'] = company.list[0]._id
    //   // const rest = { isDelete: false, company: company[0]._id }
    //   // debug('rest', rest)
    //   const result = await staffServiceInstance.findList(rest, pageSize, pageNum);
      
    //   debug(result)
    //   return result;
    // }

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
    data.startTime = new Date(data.startTime)
    data.endTime = new Date(data.endTime)
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
    let rest = { status }
    if (status === 1) {
      rest.payTime = new Date()
    } else if (status === 2) {
      rest.completionTime = new Date()
    } else if (status === -1) {
      rest.cancelTime = new Date()
    }
    debug(rest)
    const record = await orderServerInstance.updateById(orderModel, _id, rest);
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

// 前台获取订单详情
async function findOrderDetail(_id) {
  try {
    const rest = {
      _id,
      isDelete: false
    }
    const result = await orderServerInstance.findOrderDetail(rest);

    return result;
  } catch (ex) {
    throw ex
  }
}

// 用户获取订单列表
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
  findOrderDetail,
  findListUser
}