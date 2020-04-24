const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:orderComments');

const orderCommentsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order'
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  comments: {
    type: String
  },
  satisfaction: {
    type: Number
  },
  status: {
    type: Number,
    default: 0
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
module.exports = mongoose.model('orderComments', orderCommentsSchema);