const debug = require('debug')('app:controller-user');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userModel = require('../models/user');
const userServer = require('../services/userServer');

// dependence injected
const userServiceInstance = Container.get(userServer);

async function getMe(id) {
  const record = await userModel.findById(id);
  const user = _.pick(record, ['_id', 'name', 'email', 'idAdmin']);
  return user;
}

// 获取所有用户列表
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
    const result = await userServiceInstance.findList(rest, pageSize, pageNum);
    return result;
  } catch (ex) {
    throw ex
  }
}

// 管理员登录
async function adminLogin(user) {
  try {
    let record = await userServiceInstance.validationAdmin(user);
    if (!record) return false;

    const validPassword = await bcrypt.compare(user.password, record.password);
    if (!validPassword) {
      return false;
    }

    const token =  record.generateAuthToken();
    return user = {
      record,
      // record: _.pick(record, ['_id', 'account', 'isAdmin']),
      token: token
    };
  } catch (ex) {
    throw ex
  }
}

// 添加管理员
async function addAdmin(user) {
  try {
    // let result = await userServer.findUser(user);
    let result = await userServiceInstance.validationAccount(user);
    if (result) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const record = await userServiceInstance.createOne(userModel, user);
    // const token =  record.generateAuthToken();
    return user = {
      record: _.pick(record, ['_id', 'account', 'isAdmin']),
      // token: token
    };
  } catch (ex) {
    throw ex
  }
}

// 更新账号状态
async function updateStatus(_id, status) {
  try {
    // debug(_id, status)
    const record = await userServiceInstance.updateById(userModel, _id,  {status});
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

// 更新账号角色
async function updateRole(_id, role) {
  try {
    debug(_id, role)
    const record = await userServiceInstance.updateById(userModel, _id,  {role});
    debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

// 删除用户
async function deleteById(_id) {
  try {
    const record = await userServiceInstance.updateById(userModel, _id, {isDelete: true});
    debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

/**
 * client
 */

// 添加公司负责人
async function addHead(user) {
  try {
    // let result = await userServer.findUser(user);
    let result = await userServiceInstance.validationAccount(user);
    if (result) return false;

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const record = await userServiceInstance.createOne(userModel, user);
    // const token =  record.generateAuthToken();
    // debug(record)
    return record;
    // return user = {
    //   record: _.pick(record, ['_id', 'account', '']),
    //   // token: token
    // };
  } catch (ex) {
    throw ex
  }
}
// 用户登录
async function userLogin(user) {
  try {
    let record = await userServiceInstance.validationAccount(user);
    if (!record) return false;

    const validPassword = await bcrypt.compare(user.password, record.password);
    if (!validPassword) {
      return false;
    }

    const token =  record.generateAuthToken();
    return user = {
      record,
      // record: _.pick(record, ['_id', 'account', 'isAdmin']),
      token: token
    };
  } catch (ex) {
    throw ex
  }
}

// 用户注册
async function userRegister(user) {
  try {
    // let result = await userServer.findUser(user);
    let result = await userServiceInstance.validationAccount(user);
    if (result) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const record = await userServiceInstance.createOne(userModel, user);
    // debug(record)
    const token =  record.generateAuthToken();
    return user = {
      record,
      // record: _.pick(record, ['_id', 'account', 'isAdmin']),
      token: token
    };
  } catch (ex) {
    throw ex
  }
}


module.exports = {
  getMe,
  /**
   * crud
   */
  findList,
  adminLogin,
  addAdmin,
  updateStatus,
  updateRole,
  deleteById,
  /**
   * client
   */
  addHead,
  userLogin,
  userRegister
}
