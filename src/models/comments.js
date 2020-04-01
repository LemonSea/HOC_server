const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:comments');

const commentsSchema = new mongoose.Schema({
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
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff'
  },
  status: {
    type: Number,
    default:0
  },
  remark: {
    type: String
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
module.exports = mongoose.model('comments', commentsSchema);