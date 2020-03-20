const debug = require('debug')('app:controller');
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
      record: _.pick(record, ['_id', 'account', 'isAdmin']),
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
module.exports = {
  getMe,

  adminLogin,
  addAdmin,
  
}