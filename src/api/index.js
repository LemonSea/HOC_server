const Router = require('express').Router;
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const app = Router();

  // Dynamic routing loading
  fs.readdir(path.join(__dirname, './routes'), (err, files) => {
    files.forEach(fileName => {
      const name = fileName.replace(/(.*\/)*([^.]+).*/ig, "$2");

      eval(`const ${name} = require('./routes/${fileName}'); ${name}(app)`);
    });
  });

  return app
}