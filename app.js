const express = require('express');
const config = require('./src/config');
const loaders = require('./src/loaders');
const path = require('path');

async function startServer() {

  const app = express();
  
  // app.use('/public/', express.static(path.join(__dirname) + './src/public'))
  app.use('/public/', express.static('./src/public'))

  await loaders(app);

  const port = config.port || 3000
  app.listen(port, (err) => {
    if (err) {
      process.exit(1);
      return;
    }
    console.dir(`you app listen on port ${port}`);
  });
}

startServer();

