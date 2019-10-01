import { controller, get, post, del, authAdmin } from '../lib/decorator'
import {
    getAdmins,
    findAdmin,
    addAdmin,
    editAdmin,
    loginAdmin,
    delAdmin
} from '../service/admin'

@controller('/api/v0/admin')
class adminController {
    /**
     * 获取所有的管理员信息
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/all')
    @authAdmin
    async getAdmins(ctx, next) {
        const res = await getAdmins()
        if(res) {
            ctx.status = 200
            ctx.body = {
                data: res,
                state: 200
            }
        }
    }

    /**
     * 查询某个管理员
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/findOne')
    @authAdmin
    async findOne(ctx, next) {
        const { username } = ctx.query
        const res = await findAdmin(username)
        if(res) {
            ctx.status = 200
            ctx.body = {
                data: res,
                state: 200
            }
        }
    }

    /**
     * 添加管理员
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/addAdmin')
    @authAdmin
    async addAdmin(ctx, next) {
        const data = ctx.request.body
        const res = await addAdmin(data)
        if(res && !Array.isArray(res)) {
            ctx.status = 200
            ctx.body = {
                data: '添加成功',
                state: 200
            }
        }else {
            ctx.status = 403
            ctx.body = {
                data: res ? res.join(',') : '用户名已存在',
                state: 403
            }
        }
    }

    /**
     * 修改管理员
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/editAdmin')
    @authAdmin
    async editAdmin(ctx, next) {
        const data = ctx.request.body
        const res = await editAdmin(data)
        if(res && !Array.isArray(res)) {
            ctx.status = 200
            ctx.body = {
                data: '修改成功',
                state: 200
            }
        }else {
            ctx.status = 500
            ctx.body = {
                data: res ? res.join(',') : '服务器错误',
                state: 500
            }
        }
    }

    /**
     * 管理员登录
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/loginAdmin')
    async loginAdmin(ctx, next) {
        const data = ctx.request.body
        const res = await loginAdmin(data)
        if(res) {
            ctx.status = 200
            ctx.body = {
                data: '登录成功',
                state: 200
            }

            ctx.session.admin = res
        }else {
            ctx.status = 403
            ctx.body = {
                data: '密码错误或用户不存在',
                state: 403
            }
        }
    }

    /**
     * 获取当前登录管理员信息
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/getCurAdminInfo')
    async getCurAdminInfo(ctx, next) {
        if(ctx.session.admin) {
            ctx.status = 200
            ctx.body = {
                ...ctx.session.admin,
                state: 200
            }
        }else {
            ctx.status = 401
            ctx.body = {
                data: '登录信息失效，请重新登录',
                state: 401
            }
        }
    }

    /**
     * 删除管理员信息
     * @param {*} ctx 
     * @param {*} next 
     */
    @del('/delAdmin')
    @authAdmin
    async delAdmin(ctx, next) {
        let { name } = ctx.query
        let res = await delAdmin(name)
        if(res) {
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: '删除成功'
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 200,
                data: '删除失败'
            }
        }
    }

    /**
     * 退出登录
     * @param {*} ctx
     * @param {*} next
     */
    @get('/logout')
    @authAdmin
    async logout (ctx, next) {
        ctx.session = null;
        ctx.body = {
            data: '退出登录成功',
            state: 200
        }
    }
}

export default adminController
