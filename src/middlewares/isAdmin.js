const debug = require('debug')('app:isAdmin');

function isAdmin(req, res, next) {
  debug(req.currentUser)
  if(!req.currentUser.isAdmin) return res.status(403).json('Access denied.')

  next()
}

module.exports = isAdmin;