const debug = require('debug')('app:controller-staff');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const staffModel = require('../models/staff');
const companyModel = require('../models/company');
const staffServer = require('../services/staffServer');
const commonServer = require('../services/commonServer');

// dependence injected
const staffServiceInstance = Container.get(staffServer);
const companyServiceInstance = Container.get(commonServer);

// 后台获取服务人员
async function findList(item) {
  try {
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    let rest = { isDelete: false }
    if (item.searchName) {
      if (item.searchType === 'name') {
        const reg = new RegExp(item.searchName, 'i') //不区分大小写
        rest[item.searchType] = { $regex: reg }
      }
    }
    
    if (item.user !== '') {
      debug(item)
      // 获得对应用户的公司
      const firmRest = { isDelete: false, Officer: item.user }
      debug('firmRest', firmRest)
      const company = await companyServiceInstance.findList(companyModel, firmRest);
      debug('company', company)
      const rest = { isDelete: false, company: company[0]._id }
      debug('rest', rest)
      const result = await staffServiceInstance.findList(rest, pageSize, pageNum);
  
      debug(result)
      return result;
    }

    debug(item)
    const result = await staffServiceInstance.findList(rest, pageSize, pageNum);

    return result;
  } catch (ex) {
    throw ex
  }
}

// 更新服务人员类型
async function updateStatus(_id, status) {
  try {
    // debug(_id, status)
    const record = await staffServiceInstance.updateById(staffModel, _id, { status });
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

// 更新服务人员
async function updateStaff(_id, data) {
  try {
    // debug(_id, data)
    const record = await staffServiceInstance.updateById(staffModel, _id, data);
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

// 添加服务人员
async function addStaff(data) {
  try {
    debug(data)
    const record = await staffServiceInstance.createOne(staffModel, data);
    return record;
  } catch (ex) {
    throw ex
  }
}

// 删除服务人员类型
async function deleteStaff(_id) {
  try {
    const record = await staffServiceInstance.updateById(staffModel, _id, { isDelete: true });
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

/* client */

// 获取推荐员工
async function findRecommend(item) {
  try {
    const rest = { isDelete: false}
    const limit = parseInt(item)
    const result = await staffServiceInstance.recommendList(rest, limit);
    return result;
  } catch (ex) {
    throw ex
  }
}

// 前台获取服务人员
async function findStaffList(item) {
  try {
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    let rest = { isDelete: false }
    debug(rest)
    if (item.typeItem) {
      rest['staffStatus'] = item.typeItem
      debug(rest)
      // if (item.searchType === 'name') {
      //   const reg = new RegExp(item.searchName, 'i') //不区分大小写
      //   rest[item.searchType] = { $regex: reg }
      // }
    }

    // debug(item)
    const result = await staffServiceInstance.findListClient(rest, pageSize, pageNum);

    return result;
  } catch (ex) {
    throw ex
  }
}

// 前台获取服务人员详情
async function findStaffDetail(_id) {
  try {
    const rest = {
      _id,
      isDelete: false
    }
    const result = await staffServiceInstance.findStaffDetail(rest);

    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  findList,
  addStaff,
  updateStatus,
  updateStaff,
  deleteStaff,
  findRecommend,
  findStaffList,
  findStaffDetail
}