const debug = require('debug')('app:controller-company');
const { Container } = require("typedi");
const _ = require('lodash');

const companyModel = require('../models/company');
const companyServer = require('../services/companyServer');

// dependence injected
const companyServiceInstance = Container.get(companyServer);

async function addCompany(data) {
  try {
    debug(data)
    const record = await companyServiceInstance.createOne(companyModel, data);
    return record;
  } catch (ex) {
    throw ex
  }
}

// 获取公司负责人列表
async function findOfficerList(item) {
  try {
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    const rest = { isDelete: false}
    if(item.searchName) {
      if(item.searchType === 'name'){
        const reg = new RegExp(item.searchName, 'i') //不区分大小写
        rest[item.searchType] = {$regex : reg}
      }
    }
    // debug(item)
    const result = await companyServiceInstance.findList(rest, pageSize, pageNum);
    // debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addCompany,
  findOfficerList
}