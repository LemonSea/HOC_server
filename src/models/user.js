const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength:3,
    maxlength:255,
    required: true
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    unique: true
  }
});

// 直接导出模型构造函数
module.exports = mongoose.model('user', userSchema);