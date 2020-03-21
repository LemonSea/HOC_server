const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('model:staffStatus');

const staffStatusSchema = new mongoose.Schema({
  name: {
    type: String
  },
  describe: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
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
module.exports = mongoose.model('staffStatus', staffStatusSchema);