const mongoose = require('mongoose');
const Jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('model:authority');

const authoritySchema = new mongoose.Schema({
  menuList: {
    type: Array
  },
});


// 直接导出模型构造函数
module.exports = mongoose.model('authority', authoritySchema);