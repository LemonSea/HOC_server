const jwt = require('jsonwebtoken');
const config = require('../config');
const debug = require('debug')('app:isAuth');

function isAuth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json('UnauthorizedError');

  try{
    const decoded =  jwt.verify(token, config.jwtSecret);
    req.currentUser = decoded;
    next()
  } catch(e) {
    res.status(400).json('Invalid token');
  }

}

module.exports = isAuth;