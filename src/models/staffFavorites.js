const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('model:staffFavorites');

const staffFavoritesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff'
  },
  removeTime: {
    type: Date,
    default: null
  },
  createTime: {
    type: Date,
    default: Date.now 
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});


// 直接导出模型构造函数
module.exports = mongoose.model('staffFavorites', staffFavoritesSchema);