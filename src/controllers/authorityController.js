const debug = require('debug')('app:controller');
const { Container } = require("typedi");
const _ = require('lodash');

const authorityModel = require('../models/authority');
const authorityServer = require('../services/authorityServer');

// dependence injected
const authorityServiceInstance = Container.get(authorityServer);

async function addAuthority(menuList) {
  try {
    const record = await authorityServiceInstance.createOne(authorityModel, menuList);
    return record;
  } catch (ex) {
    throw ex
  }
}

async function findAuthority() {
  try {
    const result = await authorityModel.findOne();
    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addAuthority,
  findAuthority
}