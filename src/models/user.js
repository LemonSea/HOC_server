const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('model:user');

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
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  // deadTime
  // one hour
  const deadTime = Math.floor(Date.now() / 1000) + (60 * 60);
  const token = Jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
      exp: deadTime,
    },
    config.jwtSecret
  )
  return token;
}

// 直接导出模型构造函数
module.exports = mongoose.model('user', userSchema);