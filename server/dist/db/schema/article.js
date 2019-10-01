"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("../../lib/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 存放管理员数据
const articleSchema = new _schema.default('article', {
  id: "/article",
  type: "object",
  patternProperties: {
    "^[a-z0-9]+$": {
      "type": "object",
      properties: {
        tit: {
          type: "string"
        },
        label: {
          type: "string"
        },
        faceUrl: {
          type: "string"
        },
        desc: {
          type: "string"
        },
        time: {
          type: "string"
        },
        views: {
          type: "number"
        },
        flover: {
          type: "number"
        },
        articleUrl: {
          type: "string"
        }
      }
    }
  }
});
var _default = articleSchema;
exports.default = _default;