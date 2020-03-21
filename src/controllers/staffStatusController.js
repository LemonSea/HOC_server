const debug = require('debug')('app:controller');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const staffStatusModel = require('../models/staffStatus');
const staffStatusServer = require('../services/staffStatusServer');

// dependence injected
const staffStatusServiceInstance = Container.get(staffStatusServer);

// 获取服务人员类型
async function findList(query) {
  try {
    const result = await staffStatusServiceInstance.findList(staffStatusModel, query);
    return result;
  } catch (ex) {
    throw ex
  }
}

// 添加服务人员类型
async function addStaffStatus(staffStatus) {
  try {
    const record = await staffStatusServiceInstance.createOne(staffStatusModel, staffStatus);
    
    return result = {
      record: _.pick(record, ['_id', 'name', 'describe', 'creator', 'createTime', 'isDelete']),
    };
  } catch (ex) {
    throw ex
  }
}
module.exports = {
  addStaffStatus,
  findList,
}