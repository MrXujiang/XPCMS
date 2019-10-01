"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decorator = require("../lib/decorator");

var _statistics = require("../service/statistics");

var _dec, _dec2, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let statisticsController = (_dec = (0, _decorator.controller)('/api/v0/siteStatistics'), _dec2 = (0, _decorator.get)('/all'), _dec(_class = (_class2 = class statisticsController {
  async getSiteStatistics(ctx, next) {
    const res = await (0, _statistics.getSiteStatistics)();

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: res,
        state: 200
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        data: res ? res.join(',') : '服务器错误',
        state: 403
      };
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getSiteStatistics", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getSiteStatistics"), _class2.prototype)), _class2)) || _class);
var _default = statisticsController;
exports.default = _default;