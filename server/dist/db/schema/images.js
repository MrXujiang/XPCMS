"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("../../lib/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 存放图片数据
const imagesSchema = new _schema.default('images', {
  id: "/images",
  type: "object",
  properties: {
    source: {
      type: "string"
    },
    url: {
      type: "string"
    }
  }
});
var _default = imagesSchema;
exports.default = _default;