const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('model:userAddress');

const userAddressSchema = new mongoose.Schema({
  name: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  area: {
    type: Array
  },
  areaStr: {
    type: String
  },
  detailAddress: {
    type: String
  },
  phone: {
    type: Object
  },
  isDefault: {
    type: Boolean,
    default: false
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
module.exports = mongoose.model('userAddress', userAddressSchema);