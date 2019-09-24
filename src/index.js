import koa from 'koa';
// import views from 'koa-views';
import server from 'koa-static';
import { resolve } from 'path';
import * as R from 'ramda';

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
    
    // app.use(views(resolve(__dirname, './views'), { extension: 'pug' }));
    // app.use(async (ctx, next) => {
    //     await ctx.render('index', {
    //         name: 'xujiang',
    //         years: '24岁'
    //     })
    // });

    await useMiddlewares(app);

    // 设置静态目录
    app.use(server(resolve(__dirname, '../public')))
    // app.use(server(resolve(__dirname, '../static/cmsClient')))

    app.listen('3000');
}

start()


