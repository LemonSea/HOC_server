const debug = require('debug')('app:controller');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const userServer = require('../services/userServer');

// dependence injected
const userServiceInstance = Container.get(userServer);

async function logUp(user) {
  try {
    let result = await userServiceInstance.validationEmile(user);
    if (!result) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    const record = await userServiceInstance.createOne(userModel, user);
    return record;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  logUp
}