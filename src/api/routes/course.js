const route = require('express').Router();

module.exports = (app) => {

  app.use('/course', route);

  // // 在这里启动身份验证
  // route.use(middlewares.isAuth, middlewares.attachCurrentUser);

  // route.get('/me', (req, res, next) => {
  //   try {
  //     return res.json({ user: req.currentUser }).status(200);
  //   } catch (e) {
  //     logger.error('🔥 error: %o', e);
  //     return next(e);
  //   }
  // });

  route.get('/', (req, res) => {
    res.status(200).json({
      code: 0,
      course: {
        name: 'math'
      }
    })
  })
 
}
