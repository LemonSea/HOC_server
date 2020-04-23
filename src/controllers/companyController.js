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
    const rest = { isDelete: false }
    if (item.searchName) {
      if (item.searchType === 'name') {
        const reg = new RegExp(item.searchName, 'i') //不区分大小写
        rest[item.searchType] = { $regex: reg }
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

// 获取公司负责人列表
async function findOfficer(_id) {
  try {
    const rest = { isDelete: false, Officer: _id }
    // debug(item)
    const result = await companyServiceInstance.findList(rest);
    // debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}

// 更新账号状态
async function updateStatus(_id, status) {
  try {
    // debug(_id, status)
    const record = await companyServiceInstance.updateById(companyModel, _id, { status });
    // debug(record)
    return record;
  } catch (ex) {
    throw ex
  }
}

// 根据用户获得公司
async function getOfficer(item) {
  try {
    // debug(_id, status)
    const firmRest = { isDelete: false, Officer: item._id }
    // const company = await companyServiceInstance.findList(companyModel, firmRest);
    const company = await companyModel
      .find(firmRest);
    // const record = await companyServiceInstance.findById(companyModel, _id);
    // debug(company)
    return company;
  } catch (ex) {
    throw ex
  }
}

// 获取推荐公司
async function findRecommend(item) {
  try {
    const rest = { isDelete: false}
    const limit = parseInt(item)
    const result = await companyServiceInstance.recommendList(rest, limit);
    return result;
  } catch (ex) {
    throw ex
  }
}

// 前台获取服务人员详情
async function findCompanyDetail(_id) {
  try {
    const rest = {
      _id,
      isDelete: false
    }
    const result = await companyServiceInstance.findCompanyDetail(rest);

    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addCompany,
  findOfficerList,
  updateStatus,
  getOfficer,
  findRecommend,
  findCompanyDetail
}