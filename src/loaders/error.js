const logger = require('../middlewares/logger');
const winston = require('winston');

module.exports = function errorProcess() {

  // 处理未捕获异常
  process.on('uncaughtException', (ex) => {
    logger.error('%o', ex);
  });

  // 处理 promise 异常
  process.on('unhandledRejection', (ex) => {
    logger.error('%o', ex);
  })
}