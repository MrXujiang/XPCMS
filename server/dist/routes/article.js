"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decorator = require("../lib/decorator");

var _article = require("../service/article");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let articleController = (_dec = (0, _decorator.controller)('/api/v0/article'), _dec2 = (0, _decorator.get)('/all'), _dec3 = (0, _decorator.get)('/articleList'), _dec4 = (0, _decorator.get)('/:id'), _dec5 = (0, _decorator.post)('/saveArticle'), _dec6 = (0, _decorator.post)('/editArticle'), _dec7 = (0, _decorator.del)('/delArticle'), _dec8 = (0, _decorator.post)('/likeArticle/:id'), _dec(_class = (_class2 = class articleController {
  async getArticles(ctx, next) {
    let res = await (0, _article.getArticles)();

    if (res) {
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: res
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: '服务器错误'
      };
    }
  }
  /**
   * 以数组的形式获取文章，支持分页
   * @param {*} ctx 
   * @param {*} next 
   */


  async getArticleList(ctx, next) {
    let res = await (0, _article.getArticleList)(ctx.query);

    if (res) {
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: res
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: '服务器错误'
      };
    }
  }

  async getArticle(ctx, next) {
    let {
      id
    } = ctx.params;
    let res = await (0, _article.getArticle)(id);

    if (res) {
      res.views = +res.views + 1; // 添加文章阅读量统计功能

      (0, _article.calculateArticleViews)(id, res);
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: res
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: '服务器错误'
      };
    }
  }

  async saveArticle(ctx, next) {
    let data = ctx.request.body;
    let res = await (0, _article.saveArticle)(data);

    if (res === 200) {
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: '文章保存成功'
      };
    } else if (res === 500) {
      ctx.status = 500;
      ctx.body = {
        state: 500,
        data: '服务器错误'
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: res
      };
    }
  }

  async editArticle(ctx, next) {
    let data = ctx.request.body;
    let res = await (0, _article.editArticle)(data);

    if (res === 200) {
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: '文章修改成功'
      };
    } else if (res === 500) {
      ctx.status = 500;
      ctx.body = {
        state: 500,
        data: '服务器错误'
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: res
      };
    }
  }

  async delArticle(ctx, next) {
    let {
      id
    } = ctx.query;
    let res = await (0, _article.delArticle)(id);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: '文章删除成功'
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        state: 500,
        data: res
      };
    }
  }

  async likeArticle(ctx, next) {
    let {
      id
    } = ctx.params;
    let res = await (0, _article.getArticle)(id);

    if (res) {
      res.flover = +res.flover + 1;
      let result = await (0, _article.addArticleFlover)(id, res);

      if (result) {
        ctx.status = 200;
        ctx.body = {
          state: 200,
          data: result
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          state: 500,
          data: '服务器错误'
        };
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 403,
        data: '文章数据错误'
      };
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getArticles", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getArticles"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getArticleList", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getArticleList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getArticle", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "getArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveArticle", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "saveArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "editArticle", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "editArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delArticle", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "delArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "likeArticle", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "likeArticle"), _class2.prototype)), _class2)) || _class);
var _default = articleController;
exports.default = _default;