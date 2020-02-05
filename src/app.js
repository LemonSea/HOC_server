const express = require('express');
const config = require('./config');

const expressLoader = require('./loaders/express');

async function startServer() {

  const app = express();
  
  expressLoader(app);

  const port = config.port || 3000
  app.listen(port, (err) => {
    if (err) {
      process.exit(1);
    }
    console.dir(`Server listen on port ${port}`);
  });
}

startServer();

