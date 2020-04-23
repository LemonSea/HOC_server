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
    type: String,
    default: 'imgs/default/avatar/1585969641412.png'
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
  workArea: {
    type: Array
  },
  workAreaStr: {
    type: String
  },
  detailWorkAddress: {
    type: String
  },
  star: {
    type: Number,
    default: 0
  },
  oneStarOrders: {
    type: Number,
    default: 0
  },
  twoStarOrders: {
    type: Number,
    default: 0
  },
  threeStarOrders: {
    type: Number,
    default: 0
  },
  fourStarOrders: {
    type: Number,
    default: 0
  },
  fiveStarOrders: {
    type: Number,
    default: 0
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