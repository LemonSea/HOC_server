const debug = require('debug')('app:controller');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const staffModel = require('../models/staff');
const staffServer = require('../services/staffServer');

// dependence injected
const staffServiceInstance = Container.get(staffServer);

// 获取服务人员类型
async function findList(item) {
  try {
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    const rest = { isDelete: false }
    if(item.searchName) {
      if(item.searchType === 'name'){
        const reg = new RegExp(item.searchName, 'i') //不区分大小写
        rest[item.searchType] = {$regex : reg}
      }
    }
    // debug(item)
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
    const record = await staffServiceInstance.updateById(staffModel, _id,  {status});
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
    const record = await staffServiceInstance.updateById(staffModel, _id,  data);
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
    const record = await staffServiceInstance.updateById(staffModel, _id, {isDelete: true});
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}
module.exports = {
  findList,
  addStaff,
  updateStatus,
  updateStaff,
  deleteStaff
}