const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('model:user');

const userSchema = new mongoose.Schema({
  account: {
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
  avatar: {
    type: String,
  },
  realName: {
    type: String
  },
  IDCard: {
    type: String
  },
  gender: {
    type: Number
  },
  birthday: {
    type: Date
  },
  createTime: { 
    type: Date, 
    default: Date.now 
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role'
  },
  status: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isDelete: {
    type: Boolean,
    default: false,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  // deadTime
  // one hour
  const deadTime = Math.floor(Date.now() / 1000) + (60 * 60 * 60);
  const token = Jwt.sign(
    {
      _id: this._id,
      account: this.account,
      // email: this.email,
      isAdmin: this.isAdmin,
      exp: deadTime,
    },
    config.jwtSecret
  )
  return token;
}

// 直接导出模型构造函数
module.exports = mongoose.model('user', userSchema);