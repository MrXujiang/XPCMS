"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siteStatistics = exports.Session = exports.Cors = exports.KoaBody = exports.Logger = void 0;

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaSession = _interopRequireDefault(require("koa-session"));

var _koa2Cors = _interopRequireDefault(require("koa2-cors"));

var _sessionStore = _interopRequireDefault(require("../lib/sessionStore"));

var _redis = _interopRequireDefault(require("../db/redis"));

var _statistics = _interopRequireDefault(require("../db/schema/statistics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置日志
const Logger = app => app.use((0, _koaLogger.default)()); // 处理请求体


exports.Logger = Logger;

const KoaBody = app => app.use((0, _koaBody.default)()); // 配置跨域资源共享


exports.KoaBody = KoaBody;

const Cors = app => app.use((0, _koa2Cors.default)({
  origin: function (ctx) {
    if (ctx.url.indexOf('/api') > -1) {
      return false;
    }

    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
})); // 设置session


exports.Cors = Cors;

const Session = app => {
  app.keys = ['xujiang'];
  const SESSION_CONFIG = {
    key: 'zxzkCMS',
    maxAge: 12 * 60 * 60 * 1000,
    // session的失效时间,设置为半天
    store: new _sessionStore.default(_redis.default),
    signed: true
  };
  app.use((0, _koaSession.default)(SESSION_CONFIG, app));
}; // 统计网站数据


exports.Session = Session;

const siteStatistics = app => app.use(async (ctx, next) => {
  if (ctx.url.indexOf('articleList?iSaJAx=isAjax') > -1) {
    const views = await _statistics.default.hget('views');

    _statistics.default.hmset('views', +views + 1);
  }

  await next();
}); // 获取客户端ip


exports.siteStatistics = siteStatistics;

const get_client_ip = function (req) {
  let ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '';

  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }

  return ip;
};