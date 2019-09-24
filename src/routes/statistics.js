import { controller, get } from '../lib/decorator'
import {
    getSiteStatistics
} from '../service/statistics'

@controller('/api/v0/siteStatistics')
class statisticsController {
    @get('/all')
    async getSiteStatistics(ctx, next) {
        const res = await getSiteStatistics()
        if(res && !Array.isArray(res)) {
            ctx.status = 200
            ctx.body = {
                data: res,
                state: 200
            }
        }else {
            ctx.status = 403
            ctx.body = {
                data: res ? res.join(',') : '服务器错误',
                state: 403
            }
        }
    }
}

export default statisticsController
