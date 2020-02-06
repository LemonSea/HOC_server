const Router = require('express').Router;

const course = require('./routes/courses');
const user = require('./routes/users');
const auth = require('./routes/auth');

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
  user(app);
  auth(app);

  return app
}