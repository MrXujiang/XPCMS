"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchError = void 0;

var _httpException = require("../lib/httpException");

var _config = require("../config");

const catchError = app => app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof _httpException.HttpException;

    if (_config.isDev && !isHttpException) {
      throw error;
    }

    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        msg: 'we made a mistake O(∩_∩)O~~',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
});

exports.catchError = catchError;