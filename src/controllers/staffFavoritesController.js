const debug = require('debug')('app:controller-staffFavorites');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const staffFavoritesModel = require('../models/staffFavorites');
const staffFavoritesServer = require('../services/staffFavoritesServer');

// dependence injected
const staffFavoritesServiceInstance = Container.get(staffFavoritesServer);

async function findAllList(item) {
  try {
    const rest = { isDelete: false, user: item.user }
    // debug(item)
    const result = await staffFavoritesServiceInstance.findList(rest);
    debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}

// 获取收藏员工详细列表
async function findList(item) {
  try {
    const rest = { isDelete: false, user: item.user }
    const pageSize = parseInt(item.pageSize);
    const pageNum = parseInt(item.pageNum);
    // debug(item)
    const result = await staffFavoritesServiceInstance.findListHeavy(rest, pageSize, pageNum);
    // debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}

// 添加员工收藏
async function addStaffFavorites(data) {
  try {
    const record = await staffFavoritesServiceInstance.findList({ user: data.user, staff: data.staff, isDelete: false });
    // debug(record)
    if (record.length === 0) {
      const result = await staffFavoritesServiceInstance.createOne(staffFavoritesModel, data);
      // debug(result)
      return result;
    }

    return false;
  } catch (ex) {
    throw ex
  }
}

// 取消员工收藏
async function deleteStaffFavorites(data) {
  try {    
    let rest = { user: data.user, staff: data.staff, isDelete: false };
    const record = await staffFavoritesServiceInstance.findList(rest);
    debug(record)
    if (record.length === 0) {
      return false;
    }
    let doc = { isDelete: true, removeTime: new Date() }
    const result = await staffFavoritesServiceInstance.updateOne(staffFavoritesModel, rest, doc);
    // debug(result)
    return result;
  } catch (ex) {
    throw ex
  }
}


module.exports = {
  findAllList,
  findList,
  addStaffFavorites,
  deleteStaffFavorites
}
