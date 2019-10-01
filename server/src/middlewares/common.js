import logger from 'koa-logger';
import koaBody from 'koa-body';
import session from 'koa-session';
import cors from 'koa2-cors';
import sessionStore from '../lib/sessionStore';
import redis from '../db/redis';
import statisticsSchema from '../db/schema/statistics';

// 设置日志
export const Logger = app => app.use(logger())
// 处理请求体
export const KoaBody = app => app.use(koaBody())

// 配置跨域资源共享
export const Cors = app => app.use(cors({
    origin: function(ctx) {
      if (ctx.url.indexOf('/api') > -1) {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  })
)

// 设置session
export const Session = app => {
    app.keys = ['xujiang']
    const SESSION_CONFIG = {
        key: 'zxzkCMS',
        maxAge: 12 * 60 * 60 * 1000,   // session的失效时间,设置为半天
        store: new sessionStore(redis),
        signed: true
    }

    app.use(session(SESSION_CONFIG, app));
}

// 统计网站数据
export const siteStatistics = app => app.use(async (ctx, next) => {
  if(ctx.url.indexOf('articleList?iSaJAx=isAjax') > -1) {
    const views = await statisticsSchema.hget('views')
    statisticsSchema.hmset('views', +views + 1)
  }
  await next()
})

// 获取客户端ip
const get_client_ip = function(req) {
  let ip = req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
  if(ip.split(',').length>0){
      ip = ip.split(',')[0]
  }
  return ip;
};

