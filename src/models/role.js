const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:role');

const roleSchema = new mongoose.Schema({
  name: {
    type: String
  },
  menu: {
    type: Array
  },
  description: {
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
module.exports = mongoose.model('role', roleSchema);