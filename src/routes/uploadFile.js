import { controller, get, post, put } from '../lib/decorator'
import { staticPath } from '../config/index'
import {
    uploadImg,
    getGallery
} from '../service/uploadFile'


@controller('/api/v0/files')
class filesController {
    @post('/uploadAvator')
    async uploadAvator(ctx, next) {
        
    }

    @get('/uploadGallery')
    async uploadGallery(ctx, next) {
        
    }

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
