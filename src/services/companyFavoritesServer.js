const debug = require('debug')('app:staffFavorites');
const companyFavoritesModel = require('../models/companyFavorites');
const commonServer = require('./commonServer');

class companyFavoritesServer extends commonServer {
  constructor() {
    super();
  }

  async findList(rest) {
    const result = await companyFavoritesModel
        .find(rest)
    // debug(result)
    return result;
  }

  async findListHeavy(rest, pageSize, pageNum) {
    const num = await companyFavoritesModel.find(rest).count();
    const list = await companyFavoritesModel
        .find(rest)
        .populate('company')
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

module.exports = companyFavoritesServer;
