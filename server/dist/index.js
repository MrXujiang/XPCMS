"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _path = require("path");

var R = _interopRequireWildcard(require("ramda"));

var _admin = require("./service/admin");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MIDDLEWARES = ['exception', 'common', 'router'];

const useMiddlewares = app => {
  R.map(R.compose(R.forEachObjIndexed(initWith => initWith(app)), require, name => (0, _path.resolve)(__dirname, `./middlewares/${name}`)))(MIDDLEWARES);
}; // 启动逻辑


async function start() {
  const app = new _koa.default();
  await useMiddlewares(app); // 初始化管理员数据

  (0, _admin.initAdmin)({
    username: 'zxzk',
    pwd: '123',
    role: 0
  }); // 设置静态目录

  app.use((0, _koaStatic.default)((0, _path.resolve)(__dirname, '../public')));
  app.listen('3000');
}

start();
/***** koa-view基本使用 *****/
// import views from 'koa-views';
// app.use(views(resolve(__dirname, './views'), { extension: 'pug' }));
// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         name: 'xujiang',
//         years: '248岁'
//     })
// });