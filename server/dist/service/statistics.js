"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSiteStatistics = void 0;

var _statistics = _interopRequireDefault(require("../db/schema/statistics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSiteStatistics = async () => {
  const result = await _statistics.default.hgetall();
  return result;
};

exports.getSiteStatistics = getSiteStatistics;