
const winston = require('winston');
require('winston-mongodb');
const config = require('../config');

const transports = [
  //
  // - Write to all logs with level `info` and below to `combined.log` 
  // - Write all logs error (and below) to `error.log`.
  //
  new winston.transports.File({ filename: 'loggers/emerg.log', level: 'emerg' }),
  new winston.transports.File({ filename: 'loggers/alert.log', level: 'alert' }),
  new winston.transports.File({ filename: 'loggers/crit.log', level: 'crit' }),
  new winston.transports.File({ filename: 'loggers/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'loggers/warning.log', level: 'warning' }),
  new winston.transports.File({ filename: 'loggers/notice.log', level: 'notice' }),
  // in production,save the log in DB
  new winston.transports.MongoDB({
    db: config.databaseURL
  })
];
if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
} else if (process.env.NODE_ENV === 'test') {
  transports.push(
    new winston.transports.Console()
  )
}
else {
  transports.push(
    new winston.transports.File({ filename: 'loggers/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'loggers/combined.log' }),
    new winston.transports.Console()
  )
}

const logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'loggers/exceptions.log' })
  ]
});

module.exports = logger;