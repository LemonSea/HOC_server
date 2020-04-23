const debug = require('debug')('app:controller-companyFavorites');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const companyFavoritesModel = require('../models/companyFavorites');
const companyFavoritesServer = require('../services/companyFavoritesServer');

// dependence injected
const companyFavoritesServiceInstance = Container.get(companyFavoritesServer);

async function findAllList(item) {
  try {
    const rest = { isDelete: false, user: item.user }
    // debug(item)
    const result = await companyFavoritesServiceInstance.findList(rest);
    debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}

// 获取收藏公司详细列表
async function findList(item) {
  try {
    const rest = { isDelete: false, user: item.user }
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    // debug(item)
    const result = await companyFavoritesServiceInstance.findListHeavy(rest, pageSize, pageNum);
    // debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}

// 添加公司收藏
async function addCompanyFavorites(data) {
  try {
    const record = await companyFavoritesServiceInstance.findList({ user: data.user, company: data.company, isDelete: false });
    debug(record)
    if (record.length === 0) {
      const result = await companyFavoritesServiceInstance.createOne(companyFavoritesModel, data);
      // debug(result)
      return result;
    }

    return false;
  } catch (ex) {
    throw ex
  }
}

// 取消公司收藏
async function deleteCompanyFavorites(data) {
  try {    
    let rest = { user: data.user, company: data.company, isDelete: false };
    const record = await companyFavoritesServiceInstance.findList(rest);
    // debug(record)
    if (record.length === 0) {
      return false;
    }
    let doc = { isDelete: true, removeTime: new Date() }
    const result = await companyFavoritesServiceInstance.updateOne(companyFavoritesModel, rest, doc);
    // debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}


module.exports = {
  findAllList,
  findList,
  addCompanyFavorites,
  deleteCompanyFavorites
}
