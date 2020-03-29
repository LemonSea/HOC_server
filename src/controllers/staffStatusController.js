const debug = require('debug')('app:controller');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const staffStatusModel = require('../models/staffStatus');
const staffStatusServer = require('../services/staffStatusServer');

// dependence injected
const staffStatusServiceInstance = Container.get(staffStatusServer);

// 获取服务人员类型
async function findList() {
  try {
    const result = await staffStatusServiceInstance.findList({ isDelete: false });
    return result;
  } catch (ex) {
    throw ex
  }
}

// 添加服务人员类型
async function addStaffStatus(data) {
  try {
    const item = {
      name: data.data.name,
      describe: data.data.describe,
      creator: data.data.creator
    }
    // debug(item)
    const record = await staffStatusServiceInstance.createOne(staffStatusModel, item);

    return result = {
      record: _.pick(record, ['_id', 'name', 'describe', 'creator', 'createTime', 'isDelete']),
    };
  } catch (ex) {
    throw ex
  }
}
// 更新服务人员类型
async function updateStaffStatus(_id, data) {
  try {
    const record = await staffStatusServiceInstance.updateById(staffStatusModel,_id,  data);
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
    const record = await staffStatusServiceInstance.updateById(staffStatusModel, _id, {isDelete: true});
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
  addStaffStatus,
  updateStaffStatus,
  deleteStaffStatus
}