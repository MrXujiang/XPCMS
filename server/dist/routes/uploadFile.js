"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decorator = require("../lib/decorator");

var _index = require("../config/index");

var _uploadFile = require("../service/uploadFile");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let filesController = (_dec = (0, _decorator.controller)('/api/v0/files'), _dec2 = (0, _decorator.post)('/uploadAvator'), _dec3 = (0, _decorator.get)('/uploadGallery'), _dec4 = (0, _decorator.post)('/uploadSingle'), _dec5 = (0, _decorator.get)('/gallery'), _dec(_class = (_class2 = class filesController {
  async uploadAvator(ctx, next) {}

  async uploadGallery(ctx, next) {}

  async uploadLogo(ctx, next) {
    let {
      filename,
      path,
      size
    } = ctx.file;
    let {
      source
    } = ctx.request.body || 'unknow';
    let url = `${_index.staticPath}${path.split('/public')[1]}`;
    ctx.body = {
      state: 200,
      filename,
      url,
      size // 同步到图片数据库

    };
    (0, _uploadFile.uploadImg)({
      source,
      url
    });
  }

  async getGallery(ctx, next) {
    const res = await (0, _uploadFile.getGallery)();

    if (res && Array.isArray(res)) {
      res.forEach((item, i) => {
        res[i] = JSON.parse(item);
      });
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: res
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: '数据库错误'
      };
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "uploadAvator", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "uploadAvator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uploadGallery", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "uploadGallery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uploadLogo", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uploadLogo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getGallery", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "getGallery"), _class2.prototype)), _class2)) || _class);
var _default = filesController;
exports.default = _default;