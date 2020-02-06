const debug = require('debug')('app:authController');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const authServer = require('../services/authServer');

// dependence injected
const authServiceInstance = Container.get(authServer);

async function authUser(user) {
  try {
    let record = await authServiceInstance.findUser(user);
    if (!record) return false;

    const validPassword = await bcrypt.compare(user.password, record.password);
    if (!validPassword) {
      return false;
    }
    return true;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  authUser
}