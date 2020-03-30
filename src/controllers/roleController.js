const debug = require('debug')('app:controller-role');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const roleModel = require('../models/role');
const roleServer = require('../services/roleServer');

// dependence injected
const roleServiceInstance = Container.get(roleServer);

// 获取服务人员类型
async function findList() {
  try {
    const result = await roleServiceInstance.findList({ isDelete: false });
    return result;
  } catch (ex) {
    throw ex
  }
}

async function addRole(data) {
  try {
    debug(data)
    const record = await roleServiceInstance.createOne(roleModel, data);
    return record;
  } catch (ex) {
    throw ex
  }
}

async function updateRole(_id, data) {
  try {
    debug(_id, data)
    const record = await roleServiceInstance.updateById(roleModel, _id,  data);
    debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}


// 删除服务人员类型
async function deleteRole(_id) {
  try {
    const record = await roleServiceInstance.updateById(roleModel, _id, {isDelete: true});
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addRole,
  findList,
  updateRole,
  deleteRole
}