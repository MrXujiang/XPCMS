import { controller, get, post, put } from '../lib/decorator'
import { staticPath } from '../config/index'
import {
    uploadImg,
    getGallery
} from '../service/uploadFile'


@controller('/api/v0/files')
class filesController {
    /**
     * 上传头像
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/uploadAvator')
    async uploadAvator(ctx, next) {
        
    }

    /**
     * 上传到图片库/图床
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/uploadGallery')
    async uploadGallery(ctx, next) {
        
    }

    /**
     * 上传单个文件，目前采用此方案实现图片上传
     * @param {*} ctx 
     * @param {*} next 
     */
    @post('/uploadSingle')
    async uploadLogo(ctx, next) {
        let { filename, path, size } = ctx.file;
        let { source } = ctx.request.body || 'unknow';

        let url = `${staticPath}${path.split('/public')[1]}`;
        ctx.body = {
            state: 200,
            filename,
            url,
            size
        }

        // 同步到图片数据库
        uploadImg({ source, url });
    }

    /**
     * 获取所有图片
     * @param {*} ctx 
     * @param {*} next 
     */
    @get('/gallery')
    async getGallery(ctx, next) {
        const res = await getGallery()
        if(res && Array.isArray(res)){
            res.forEach((item, i) => {
                res[i] = JSON.parse(item)
            })

            ctx.status = 200
            ctx.body = {
                state: 200,
                data: res
            }
        }else {
            ctx.status = 403
            ctx.body = {
                state: 403,
                data: '数据库错误'
            }
        }
    }
}

export default filesController
