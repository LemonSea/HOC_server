const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const errorProcessLoader = require('./error');

module.exports = (app) => {

  // 处理未捕获异常或 promise 异常
  errorProcessLoader();

  // 使用 express
  expressLoader(app);

  // 连接数据库
  const mongooseConnect = mongooseLoader();
}