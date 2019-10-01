"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _decorator = require("../lib/decorator");

var _admin = require("../service/admin");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let adminController = (_dec = (0, _decorator.controller)('/api/v0/admin'), _dec2 = (0, _decorator.get)('/all'), _dec3 = (0, _decorator.get)('/findOne'), _dec4 = (0, _decorator.post)('/addAdmin'), _dec5 = (0, _decorator.post)('/editAdmin'), _dec6 = (0, _decorator.post)('/loginAdmin'), _dec7 = (0, _decorator.get)('/getCurAdminInfo'), _dec8 = (0, _decorator.del)('/delAdmin'), _dec9 = (0, _decorator.get)('/logout'), _dec(_class = (_class2 = class adminController {
  /**
   * 获取所有的管理员信息
   * @param {*} ctx 
   * @param {*} next 
   */
  async getAdmins(ctx, next) {
    const res = await (0, _admin.getAdmins)();

    if (res) {
      ctx.status = 200;
      ctx.body = {
        data: res,
        state: 200
      };
    }
  }
  /**
   * 查询某个管理员
   * @param {*} ctx 
   * @param {*} next 
   */


  async findOne(ctx, next) {
    const {
      username
    } = ctx.query;
    const res = await (0, _admin.findAdmin)(username);

    if (res) {
      ctx.status = 200;
      ctx.body = {
        data: res,
        state: 200
      };
    }
  }
  /**
   * 添加管理员
   * @param {*} ctx 
   * @param {*} next 
   */


  async addAdmin(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _admin.addAdmin)(data);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: '添加成功',
        state: 200
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        data: res ? res.join(',') : '用户名已存在',
        state: 403
      };
    }
  }
  /**
   * 修改管理员
   * @param {*} ctx 
   * @param {*} next 
   */


  async editAdmin(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _admin.editAdmin)(data);

    if (res && !Array.isArray(res)) {
      ctx.status = 200;
      ctx.body = {
        data: '修改成功',
        state: 200
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        data: res ? res.join(',') : '服务器错误',
        state: 500
      };
    }
  }
  /**
   * 管理员登录
   * @param {*} ctx 
   * @param {*} next 
   */


  async loginAdmin(ctx, next) {
    const data = ctx.request.body;
    const res = await (0, _admin.loginAdmin)(data);

    if (res) {
      ctx.status = 200;
      ctx.body = {
        data: '登录成功',
        state: 200
      };
      ctx.session.admin = res;
    } else {
      ctx.status = 403;
      ctx.body = {
        data: '密码错误或用户不存在',
        state: 403
      };
    }
  }
  /**
   * 获取当前登录管理员信息
   * @param {*} ctx 
   * @param {*} next 
   */


  async getCurAdminInfo(ctx, next) {
    if (ctx.session.admin) {
      ctx.status = 200;
      ctx.body = { ...ctx.session.admin,
        state: 200
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        data: '登录信息失效，请重新登录',
        state: 401
      };
    }
  }
  /**
   * 删除管理员信息
   * @param {*} ctx 
   * @param {*} next 
   */


  async delAdmin(ctx, next) {
    let {
      name
    } = ctx.query;
    let res = await (0, _admin.delAdmin)(name);

    if (res) {
      ctx.status = 200;
      ctx.body = {
        state: 200,
        data: '删除成功'
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        state: 200,
        data: '删除失败'
      };
    }
  }
  /**
   * 退出登录
   * @param {*} ctx
   * @param {*} next
   */


  async logout(ctx, next) {
    ctx.session = null;
    ctx.body = {
      data: '退出登录成功',
      state: 200
    };
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getAdmins", [_dec2, _decorator.authAdmin], Object.getOwnPropertyDescriptor(_class2.prototype, "getAdmins"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "findOne", [_dec3, _decorator.authAdmin], Object.getOwnPropertyDescriptor(_class2.prototype, "findOne"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAdmin", [_dec4, _decorator.authAdmin], Object.getOwnPropertyDescriptor(_class2.prototype, "addAdmin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "editAdmin", [_dec5, _decorator.authAdmin], Object.getOwnPropertyDescriptor(_class2.prototype, "editAdmin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginAdmin", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "loginAdmin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCurAdminInfo", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "getCurAdminInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delAdmin", [_dec8, _decorator.authAdmin], Object.getOwnPropertyDescriptor(_class2.prototype, "delAdmin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logout", [_dec9, _decorator.authAdmin], Object.getOwnPropertyDescriptor(_class2.prototype, "logout"), _class2.prototype)), _class2)) || _class);
var _default = adminController;
exports.default = _default;