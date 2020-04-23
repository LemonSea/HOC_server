const debug = require('debug')('app:controller-userAddress');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userAddressModel = require('../models/userAddress');
const userAddressServer = require('../services/userAddressServer');

// dependence injected
const userAddressServiceInstance = Container.get(userAddressServer);

// 获取服务人员类型
async function findList(user) {
  try {
    const result = await userAddressServiceInstance.findList({ creator: user, isDelete: false });
    return result;
  } catch (ex) {
    throw ex
  }
}

async function addUserAddress(data) {
  try {
    const record = await findList(data.creator);
    if(record.length === 0) {
      data.isDefault = true;
    }

    const result = await userAddressServiceInstance.createOne(userAddressModel, data);
    return result;
  } catch (ex) {
    throw ex
  }
}

async function updateUserAddress(_id, data) {
  try {
    const result = await userAddressServiceInstance.updateById(userAddressModel, _id,  data);
    // debug(data)
    return result;
  } catch (ex) {
    throw ex
  }
}
async function deleteUserAddress(_id) {
  try {
    // const result = await userAddressServiceInstance.deleteById(userAddressModel, _id);
    const result = await userAddressServiceInstance.updateById(userAddressModel, _id, {isDelete: true});
    // debug(data)
    return result;
  } catch (ex) {
    throw ex
  }
}

async function setDefault(oleId, newId) {
  try {
    const record = await userAddressServiceInstance.updateById(userAddressModel, oleId,  { isDefault: false });
    const result = await userAddressServiceInstance.updateById(userAddressModel, newId,  { isDefault: true });
    // debug(record)
    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  findList,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setDefault
}
