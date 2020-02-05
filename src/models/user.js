const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    num: {
      type: Number,
      enum: [0, 1, 2],
      default: 0
    },
    name: {
      type: String,
      enum: ['未知', '男', '女'],
      default: '未知'
    }
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
})

// 直接导出模型构造函数
module.exports = mongoose.model('User', userSchema);