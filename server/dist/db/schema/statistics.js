"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("../../lib/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 存放网站统计数据
const statisticsSchema = new _schema.default('statistics', {
  id: "/statistics",
  type: "object",
  properties: {
    "views": {
      type: "number"
    }
  }
});
var _default = statisticsSchema;
exports.default = _default;