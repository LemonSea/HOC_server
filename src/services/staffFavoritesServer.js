const debug = require('debug')('app:staffFavorites');
const staffFavoritesModel = require('../models/staffFavorites');
const commonServer = require('./commonServer');

class staffFavoritesServer extends commonServer {
  constructor() {
    super();
  }

  async findList(rest) {
    const result = await staffFavoritesModel
        .find(rest)
    // debug(result)
    return result;
  }

  async findListHeavy(rest, pageSize, pageNum) {
    const num = await staffFavoritesModel.find(rest).count();
    const list = await staffFavoritesModel
        .find(rest)
        .populate('staff')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize).exec()
    // debug(list)
    return {
      num,
      pageSize,
      pageNum,
      list
    };
  }
}

module.exports = staffFavoritesServer;
