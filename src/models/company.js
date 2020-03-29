const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:company');

const companySchema = new mongoose.Schema({
  name: {
    type: String
  },
  Officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'officerInfo'
  },
  describe: {
    type: String
  },
  address: {
    type: String
  },
  phone1: {
    type: String
  },
  phone2: {
    type: String
  },
  phone3: {
    type: String
  },
  staffCount: {
    type: Number
  },
  main: {
    type: String
  },
  status: {
    type: Number
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