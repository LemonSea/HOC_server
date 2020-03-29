const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:officerInfo');

const officerInfoSchema = new mongoose.Schema({
  name: {
    type: String
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  relationship: {
    type: String
  },
  IDCard: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
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
module.exports = mongoose.model('officerInfo', officerInfoSchema);