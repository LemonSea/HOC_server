const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:staff');

const staffSchema = new mongoose.Schema({
  name: {
    type: String
  },
  staffStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staffStatus'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  costHour: {
    type: Number
  },
  status: {
    type: Number
  },
  workNumber: {
    type: String
  },
  IDCard: {
    type: String
  },
  avatar: {
    type: String
  },
  imgs: {
    type: Array
  },
  gender: {
    type: Number
  },
  age: {
    type: Number
  },
  inductionTime: {
    type: String
  },
  address: {
    type: String
  },
  star: {
    type: Number
  },
  orderCount: {
    type: Number
  },
  highPraiseOrder: {
    type: Number
  },
  badReviewOrder: {
    type: Number
  },
  introduction: {
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
module.exports = mongoose.model('staff', staffSchema);