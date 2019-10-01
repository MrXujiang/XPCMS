import { HttpException } from '../lib/httpException'
import { isDev } from '../config'
/**
 * 创建捕获异常中间件
 * @param {*} app 
 */
export const catchError = app => app.use(async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        
        if(isDev && !isHttpException) {
            throw error
        }

        if(isHttpException) {
            ctx.body = {
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: 'we made a mistake O(∩_∩)O~~',
                error_code: 999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
})