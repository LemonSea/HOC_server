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


module.exports = {
  getMe
}