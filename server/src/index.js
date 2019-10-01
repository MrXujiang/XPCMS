import koa from 'koa';
import server from 'koa-static';
import { resolve } from 'path';
import * as R from 'ramda';
import { initAdmin } from './service/admin';

const MIDDLEWARES = ['exception', 'common', 'router'];

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

// 启动逻辑
async function start() {
    const app = new koa();
    await useMiddlewares(app);

    // 初始化管理员数据
    initAdmin({
        username: 'zxzk',
        pwd: '123',
        role: 0
    })

    // 设置静态目录
    app.use(server(resolve(__dirname, '../public')))
    app.listen('3000');
}

start()

/***** koa-view基本使用 *****/
// import views from 'koa-views';
// app.use(views(resolve(__dirname, './views'), { extension: 'pug' }));
// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         name: 'xujiang',
//         years: '248岁'
//     })
// });


