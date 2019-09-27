import { controller, get, post, del } from '../lib/decorator'
import {
    getArticles,
    getArticle,
    saveArticle,
    editArticle,
    delArticle,
    getArticleList,
    addArticleFlover,
    calculateArticleViews,
} from '../service/article'


@controller('/api/v0/article')
class articleController {
    /**
     * 获取所有文章数据
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/all')
    async getArticles(ctx, next) {
        let res = await getArticles()
        if(res) {
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: res
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: '服务器错误'
            }
        }
    }

    /**
     * 以数组的形式获取文章，支持分页
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/articleList')
    async getArticleList(ctx, next) {
        let res = await getArticleList(ctx.query)
        if(res) {
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: res
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: '服务器错误'
            }
        }
    }

    /**
     * 根据id文章
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/:id')
    async getArticle(ctx, next) {
        let { id } = ctx.params
        let res = await getArticle(id)
        if(res) {
            res.views = +res.views + 1
            // 添加文章阅读量统计功能
            calculateArticleViews(id, res)
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: res
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: '服务器错误'
            }
        }
    }

    /**
     * 保存文章
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/saveArticle')
    async saveArticle(ctx, next) {
        let data = ctx.request.body
        let res = await saveArticle(data)
        if(res === 200) {
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: '文章保存成功'
            }
        }else if(res === 500) {
            ctx.status = 500
            ctx.body = {
                state: 500,
                data: '服务器错误'
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: res
            }
        } 
    }

    /**
     * 编辑文章
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/editArticle')
    async editArticle(ctx, next) {
        let data = ctx.request.body
        let res = await editArticle(data)
        if(res === 200) {
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: '文章修改成功'
            }
        }else if(res === 500) {
            ctx.status = 500
            ctx.body = {
                state: 500,
                data: '服务器错误'
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: res
            }
        } 
    }

    /**
     * 删除文章
     * @param {*} ctx 
     * @param {*} next 
     */
    @del('/delArticle')
    async delArticle(ctx, next) {
        let { id } = ctx.query
        let res = await delArticle(id)
        if(res && !Array.isArray(res)) {
            ctx.status = 200
            ctx.body = {
                state: 200,
                data: '文章删除成功'
            }
        }else {
            ctx.status = 500
            ctx.body = {
                state: 500,
                data: res
            }
        }
    }

    /**
     * 文章点赞功能
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/likeArticle/:id')
    async likeArticle(ctx, next) {
        let { id } = ctx.params
        let res = await getArticle(id)
        if(res) {
            res.flover= +res.flover +1
            let result = await addArticleFlover(id, res)
            if(result) {
                ctx.status = 200
                ctx.body = {
                    state: 200,
                    data: result
                }
            }else {
                ctx.status = 500
                ctx.body = {
                    state: 500,
                    data: '服务器错误'
                }
            }
            
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: '文章数据错误'
            }
        }
    }
}

export default articleController
