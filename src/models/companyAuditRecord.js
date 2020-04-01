const mongoose = require('mongoose');
const config = require('../config');
const debug = require('debug')('model:companyAuditRecord');

const companyAuditRecordSchema = new mongoose.Schema({
  name: {
    type: String
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
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
module.exports = mongoose.model('companyAuditRecord', companyAuditRecordSchema);