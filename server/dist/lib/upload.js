"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFolder = deleteFolder;
exports.writeFile = writeFile;
exports.delFile = exports.upload = void 0;

var _multer = _interopRequireDefault(require("@koa/multer"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootImages = (0, _path.resolve)(__dirname, '../../public/uploads'); //上传文件存放路径、及文件命名

const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rootImages);
  },
  filename: function (req, file, cb) {
    let [name, type] = file.originalname.split('.');
    cb(null, `${name}_${Date.now().toString(16)}.${type}`);
  }
}); //文件上传限制


const limits = {
  fields: 10,
  //非文件字段的数量
  fileSize: 1024 * 1024,
  //文件大小 单位 b
  files: 1 //文件数量

};
const upload = (0, _multer.default)({
  storage,
  limits
}); // 删除文件

exports.upload = upload;

const delFile = path => {
  return new Promise((resolve, reject) => {
    _fs.default.unlink(path, err => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}; // 删除文件夹


exports.delFile = delFile;

function deleteFolder(path) {
  var files = [];

  if (_fs.default.existsSync(path)) {
    files = _fs.default.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;

      if (_fs.default.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath);
      } else {
        // delete file
        _fs.default.unlinkSync(curPath);
      }
    });

    _fs.default.rmdirSync(path);
  }
}

function writeFile(path, data, encode) {
  return new Promise((resolve, reject) => {
    _fs.default.writeFile(path, data, encode, err => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}