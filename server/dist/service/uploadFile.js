"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGallery = exports.uploadImg = void 0;

var _images = _interopRequireDefault(require("../db/schema/images"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadImg = async data => {
  const result = await _images.default.lpush(data);
  return result;
};

exports.uploadImg = uploadImg;

const getGallery = async () => {
  const result = await _images.default.lrange(0, -1);
  return result;
};

exports.getGallery = getGallery;