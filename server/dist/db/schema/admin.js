"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("../../lib/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 存放管理员数据
const adminSchema = new _schema.default('admin', {
  id: "/admin",
  type: "object",
  properties: {
    username: {
      type: "string"
    },
    pwd: {
      type: "string"
    },
    role: {
      type: "number" // 0 超级管理员 1 普通管理员

    }
  }
});
var _default = adminSchema;
exports.default = _default;