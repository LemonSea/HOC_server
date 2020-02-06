const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
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

userSchema.methods.generateAuthToken = function () {
  // deadTime
  // one hour
  const deadTime = Math.floor(Date.now() / 1000) + (60 * 60);
  const token = Jwt.sign(
    {
      id: this._id,
      exp: deadTime,
    },
    config.jwtSecret
  )
  return token;
}

// 直接导出模型构造函数
module.exports = mongoose.model('user', userSchema);