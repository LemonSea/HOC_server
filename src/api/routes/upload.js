const route = require('express').Router();
const debug = require('debug')('app:upload');
const _ = require('lodash');
const logger = require('../../middlewares/logger');

var formidable = require("formidable");
const fs = require("fs");
const path = require('path');

const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');
const processGet = require('../../tools/processGet');

// const staffController = require('../../controllers/staffController');


module.exports = (app) => {

  app.use('/upload', route);

  route.post('/staff/pic', function (req, res) {

    var form = new formidable.IncomingForm();
    form.uploadDir = '/tmp';   //文件保存在系统临时目录
    // form.maxFieldsSize = 1 * 1024 * 1024;  //上传文件大小限制为最大1M  
    form.keepExtensions = true;        //使用文件的原扩展名

    var targetDir = path.join(__dirname, '../../public/staff/pic');
    // 检查目标目录，不存在则创建
    fs.access(targetDir, function (err) {
      if (err) {
        fs.mkdirSync(targetDir);
      }
      _fileParse();
    });

    // 文件解析与保存
    function _fileParse() {
      form.parse(req, function (err, fields, files) {
        if (err) throw err;
        // var filesUrl = [];
        var filesUrl = '';
        var fileName = '';
        var errCount = 0;
        var keys = Object.keys(files);
        keys.forEach(function (key) {
          var filePath = files[key].path;
          var fileExt = filePath.substring(filePath.lastIndexOf('.'));
          if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
            errCount += 1;
          } else {
            //以当前时间戳对上传文件进行重命名
            fileName = new Date().getTime() + fileExt;
            var targetFile = path.join(targetDir, fileName);
            //移动文件
            fs.renameSync(filePath, targetFile);
            // 文件的Url（相对路径）
            // filesUrl.push('/staff/pic/' + fileName)
            filesUrl = '/staff/pic/' + fileName;
          }
        });
        const data = {
          name: fileName,
          url: filesUrl
        }
        // 返回上传信息
        // res.json({ filesUrl: filesUrl, success: keys.length - errCount, error: errCount });
        
        res.status(200).json(
          {
            "status": 0,
            "data":data
          }
        );
      });
    }

  });
}
