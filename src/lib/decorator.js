const Router = require('koa-router')
const { resolve } = require('path')
const { upload } = require('./upload')
const glob = require('glob')
const R = require('ramda');
const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

const isArray = arr => Array.isArray(arr) ? arr : [arr]
const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path);
    routerMap.set({
        target,
        ...conf
    }, target[key])
}

// 为了捕获multer的错误
const uploadSingleCatchError = async (ctx, next) => {
    let err = await upload.single('file')(ctx, next).then(res => res)
                .catch(err => err);
    if(err) {
        ctx.status = 500
        ctx.body = {
            state: 500,
            msg: err.message
        }
    }
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

export class Route {
    constructor(app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router();
    }

    init() {
        glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
        for(let [conf, controller] of routerMap) {
            const controllers = isArray(controller)
            let prefixPath = conf.target[symbolPrefix]
            if(prefixPath) prefixPath = normalizePath(prefixPath)
            const routerPath = prefixPath + conf.path
            if(conf.path.indexOf('/upload') > -1) {
                this.router[conf.method](routerPath, uploadSingleCatchError, ...controllers)
            }else{
                this.router[conf.method](routerPath, ...controllers)
            }
        }

        this.app.use(this.router.routes()).use(this.router.allowedMethods())
    }
}

export const get = path => router({
    method: 'get',
    path
})

export const post = path => router({
    method: 'post',
    path
})

export const put = path => router({
    method: 'put',
    path
})

export const del = path => router({
    method: 'del',
    path
})

export const all = path => router({
    method: 'all',
    path
})

const convert = middleware => (target, key, descriptor) => {
    target[key] = R.compose(
        R.concat(
           isArray(middleware)
        ),
        isArray
    )(target[key])
    return descriptor
}

export const authAdmin = convert(async (ctx, next) => {
    if(!ctx.session.admin) {
        ctx.status = 401
        ctx.body = {
            success: false,
            state: 401,
            err: '登录信息失效，重新登录'
        }
        return
    }
    await next()
})

export const adminRole = roleExp => convert(async (ctx, next) => {
    const { role } = ctx.session.admin
    if(+role !== roleExp) {
        ctx.status = 401
        ctx.body = {
            success: false,
            state: 401,
            err: '您没有权限操作'
        }
        return
    }
    await next()
})

// 参数合法性校验
export const required = rules => convert(async (ctx, next) => {
    let errors = []

    const checkRules = R.forEachObjIndexed(
        (value, key) => {
            errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
        }
    )

    checkRules(rules)

    if(errors.length) {
        ctx.throw(412, `${errors.join(',')} is required`)
        return
    }

    await next()
})
