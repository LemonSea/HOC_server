const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:company');

const companySchema = new mongoose.Schema({
  name: {
    type: String
  },
  Officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  describe: {
    type: String
  },
  address: {
    type: String
  },
  imgs: {
    type: Array
  },
  phone1: {
    type: Object
  },
  phone2: {
    type: Object
  },
  phone3: {
    type: Object
  },
  email: {
    type: String
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