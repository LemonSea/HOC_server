const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');

module.exports = (app) => {
  const mongooseConnect = mongooseLoader();
  expressLoader(app);
}