const Router = require('express').Router;

const course = require('./routes/course');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();

  // dynamic route import
  // abandoned, performance degradation
  // fs.readdir(path.join(__dirname, './routes'), (err, files) => {
  //   files.forEach(fileName => {
  //     const name = fileName.replace(/(.*\/)*([^.]+).*/ig, "$2");

  //     eval(`const ${name} = require('./routes/${fileName}'); ${name}(app)`);
  //   });
  // });

  course(app);

  return app
}