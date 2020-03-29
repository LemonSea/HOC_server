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

// 添加服务人员类型
async function addStaff(data) {
  try {
    debug(data)
    // const item = {
    //   name: data.data.name,
    //   describe: data.data.describe,
    //   creator: data.data.creator
    // }
    // debug(item)
    const record = await staffServiceInstance.createOne(staffModel, data);

    return record;
    // return result = {
    //   record: _.pick(record, ['_id', 'name', 'describe', 'creator', 'createTime', 'isDelete']),
    // };
  } catch (ex) {
    throw ex
  }
}
// 更新服务人员类型
async function updateStaffStatus(_id, data) {
  try {
    const record = await staffStatusServiceInstance.updateById(staffModel,_id,  data);
    // debug(record)
    return result = {
      record: _.pick(record, ['_id', 'name', 'describe', 'creator', 'createTime', 'isDelete']),
    };
  } catch (ex) {
    throw ex
  }
}
// 删除服务人员类型
async function deleteStaffStatus(_id) {
  try {
    const record = await staffStatusServiceInstance.updateById(staffModel, _id, {isDelete: true});
    // debug(record)
    return result = {
      record: _.pick(record, ['_id', 'name', 'describe', 'creator', 'createTime', 'isDelete']),
    };
  } catch (ex) {
    throw ex
  }
}
module.exports = {
  findList,
  addStaff,
  // updateStaffStatus,
  // deleteStaffStatus
}