"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Forbbiden = exports.AuthFailed = exports.NotFound = exports.Success = exports.ParameterException = exports.HttpException = void 0;

class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }

}

exports.HttpException = HttpException;

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }

}

exports.ParameterException = ParameterException;

class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }

}

exports.Success = Success;

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10000;
    this.code = 404;
  }

}

exports.NotFound = NotFound;

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10004;
    this.code = 401;
  }

}

exports.AuthFailed = AuthFailed;

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
    this.code = 403;
  }

}

exports.Forbbiden = Forbbiden;