const helmet = require('helmet');
const morgan = require('morgan');

const staticLoader = require('./static');
const corsLoader = require('./cors');

module.exports = (app) => {

  // secure Express apps by setting various HTTP headers
  app.use(helmet());

  // morgan just enable in development
  if(app.get('env')=== 'development') {
    app.use(morgan('tiny'));
  }

  // public static resource
  staticLoader(app);

  // set CORS
  corsLoader(app);
}