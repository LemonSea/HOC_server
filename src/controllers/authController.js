const debug = require('debug')('app:authController');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const authServer = require('../services/authServer');
const userModel = require('../models/user');
const _ = require('lodash');

// dependence injected
const authServiceInstance = Container.get(authServer);

async function SignUp(user) {
  try {
    let result = await authServiceInstance.findUser(user);
    if (result) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const record = await authServiceInstance.createOne(userModel, user);
    const token =  record.generateAuthToken();
    return user = {
      record: _.pick(record, ['_id', 'name', 'email']),
      token: token
    };
  } catch (ex) {
    throw ex
  }
}

async function SignIn(user) {
  try {
    let record = await authServiceInstance.findUser(user);
    if (!record) return false;

    const validPassword = await bcrypt.compare(user.password, record.password);
    if (!validPassword) {
      return false;
    }

    const token =  record.generateAuthToken();

    debug(validPassword)
    return user = {
      record: _.pick(record, ['_id', 'account']),
      token: token
    };
  } catch (ex) {
    throw ex
  }
}

// 已迁移至用户 model 作为用户的一个 method
// function generateToken(user) {
//   // deadTime
//   // one hour
//   const deadTime = Math.floor(Date.now() / 1000) + (60 * 60);
//   const token = Jwt.sign(
//     {
//       id: user._id,
//       exp: deadTime,
//     },
//     config.jwtSecret
//   )
//   return token;
// }

module.exports = {
  SignUp,
  SignIn
}