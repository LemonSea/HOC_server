const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:company');

const companySchema = new mongoose.Schema({
  name: {
    type: String
  },
  // Officer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  describe: {
    type: String
  },
  address: {
    type: String
  },
  phone1: {
    type: Array
  },
  phone2: {
    type: Array
  },
  phone3: {
    type: Array
  },
  staffCount: {
    type: Number,
    default: 0
  },
  main: {
    type: String
  },
  status: {
    type: Number,
    default:0
  },
  auditRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companyAuditRecord'
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
module.exports = mongoose.model('company', companySchema);