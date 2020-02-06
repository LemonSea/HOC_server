const express = require('express');
const config = require('./config');

const loaders = require('./loaders');
const logger = require('./middlewares/logger');

async function startServer() {

  const app = express();

  loaders(app);

  const p = Promise.reject(new Error('Something failed miserably!'));
  p.then(() => console.log('Done'))

  const port = config.port || 3000
  app.listen(port, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
    // throw new Error('Something failed during startup.')
    // console.dir(`Server listen on port ${port}`);
  });
}

startServer();
