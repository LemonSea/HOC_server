const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:order');

const orderSchema = new mongoose.Schema({
  name: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  address: {
    type: String
  },
  phone: {
    type: Object
  },
  amount: {
    type: Number
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  countTime: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  note: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now 
  },
  firstTime: {
    type: Date,
    default: Date.now 
  },
  payTime: {
    type: Date,
    default:null
  },
  completionTime: {
    type: Date,
    default:null
  },
  satisfaction: {
    type: Number,
    default:5
  },
  evaluation: {
    type: Number,
    default:null
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});


// 直接导出模型构造函数
module.exports = mongoose.model('order', orderSchema);