"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decorator = require("../lib/decorator");

var _config = require("../service/config");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let configController = (_dec = (0, _decorator.controller)('/api/v0/config'), _dec2 = (0, _decorator.get)('/all'), _dec3 = (0, _decorator.post)('/setHeader'), _dec4 = (0, _decorator.post)('/setBanner'), _dec5 = (0, _decorator.post)('/setBannerSider'), _dec6 = (0, _decorator.post)('/setSupportPay'), _dec(_class = (_class2 = class configController {
  async getConfig(ctx, next) {
    const res = await (0, _config.getConfig)();

    if (res && !Array.isArray(res)) {
      // 将数据转化为json
      for (let key in res) {
        let v = res[key];
        res[key] = JSON.parse(v);
      }

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

  async setHeader(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _config.setHeader)(data);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: '保存成功',
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

  async setBanner(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _config.setBanner)(data);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: '保存成功',
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

  async setBannerSider(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _config.setBannerSider)(data);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: '保存成功',
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

  async setSupportPay(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _config.setSupportPay)(data);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: '保存成功',
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

}, (_applyDecoratedDescriptor(_class2.prototype, "getConfig", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getConfig"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setHeader", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "setHeader"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setBanner", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "setBanner"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setBannerSider", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "setBannerSider"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSupportPay", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "setSupportPay"), _class2.prototype)), _class2)) || _class);
var _default = configController;
exports.default = _default;