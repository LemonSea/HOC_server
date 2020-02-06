const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

const startDebugger = require('debug')('app:start')
const debug = require('debug')('loader:express');

const staticLoader = require('./static');
const corsLoader = require('./cors');
const routes = require('../api/index');
const config = require('../config');
const error = require('../middlewares/error');

module.exports = (app) => {

  // winston.add(winston.transports.File, {
  //   filename: 'logfile.log'
  // })

  startDebugger('start Debugger!')

  // secure Express apps by setting various HTTP headers
  app.use(helmet());

  // morgan just enable in development
  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
  }

  // public static resource
  staticLoader(app);

  // set CORS
  corsLoader(app);

  app.use(express.json())

  // Load API routes
  app.use(config.api.prefix, routes());

  // process error
  app.use(error)

}