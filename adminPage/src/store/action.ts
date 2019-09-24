import { 
    HeaderType,
    Banner,
    BannerSider,
    SupportPay
 } from './type'
import http from '../utils/http'
import { uuid, formatTime } from '../utils/common'
import { message } from 'ant-design-vue'

export default {
    /**配置 */
    setConfig(context: any, paylod: HeaderType) {
        http.get('/config/all').then((res:any) => {
            context.commit('setConfig', res.data)
        }).catch((err:any) => {
            message.error(err.data)
        })
    },

    /**header */
    saveHeader(context: any, paylod: HeaderType) {
        http.post('/config/setHeader', paylod).then((res:any) => {
            message.success(res.data)
            context.commit('saveHeader', paylod)
        }).catch((err:any) => {
            message.error(err.data)
        })  
    },

    /**banner */
    saveBanner(context: any, paylod: Banner) {
        console.log(111, paylod)
        http.post('/config/setBanner', paylod).then((res:any) => {
            message.success(res.data)
        }).catch((err:any) => {
            message.error(err.data)
        })  
    },

    saveBannerSider(context: any, paylod: BannerSider) {
        http.post('/config/setBannerSider', paylod).then((res:any) => {
            message.success(res.data)
            context.commit('saveBannerSider', paylod)
        }).catch((err:any) => {
            message.error(err.data)
        })  
    },

    saveSupportPay(context: any, paylod: SupportPay) {
        http.post('/config/setSupportPay', paylod).then((res:any) => {
            message.success(res.data)
            context.commit('saveSupportPay', paylod)
        }).catch((err:any) => {
            message.error(err.data)
        })  
    },

    /**文章列表 */
    getArticles(context: any) {
        http.get('article/all').then((res:any) => {
            context.commit('getArticles', res.data);
        }).catch((err:any)=>{
            message.error(err.data)
        })
    },

    addArticle(context: any, paylod: any) {
        paylod.id = uuid(8, 10);
        paylod.time = formatTime(Date.now(), '/');
        paylod.views = 0;
        paylod.flover = 0;
        return new Promise((resolve:any, reject:any) => {
            http.post('/article/saveArticle', paylod).then((res:any) => {
                context.commit('addArticle', paylod)
                message.success(res.data)
                resolve()
            }).catch((err:any) => {
                message.error(err.data)
                reject()
            })
        })  
    },

    editArticle(context: any, paylod: any) {
        return new Promise((resolve:any, reject:any) => {
            http.post('/article/editArticle', paylod).then((res:any) => {
                context.commit('editArticle', paylod)
                message.success(res.data)
                resolve()
            }).catch((err:any) => {
                message.error(err.data)
                reject()
            })
        })
    },

    delArticle(context: any, paylod: any) {
        return new Promise((resolve:any, reject:any) => {
            http.del('/article/delArticle', {id:paylod.id}).then((res:any) => {
                context.commit('delArticle', paylod)
                message.success(res.data)
                resolve()
            }).catch((err:any) => {
                message.error(err.data)
                reject()
            })
        })
    },

    // admin
    getAdmins(context: any) {
        http.get('admin/all').then((res:any) => {
            context.commit('getAdmins', res.data);
        }).catch((err:any)=>{
            message.error(err.data)
        })
    },

    addAdmin(context: any, paylod: any) {
        return new Promise((resolve:any, reject:any) => {
            http.post('admin/addAdmin', paylod).then((res:any) => {
                context.commit('addAdmin', paylod)
                message.success(res.data)
                resolve()
            }).catch((err:any)=>{
                message.error(err.data)
                reject()
            })
        })
    },

    editAdmin(context: any, paylod: any) {
        return new Promise((resolve:any, reject:any) => {
            http.post('admin/editAdmin', paylod).then((res:any) => {
                context.commit('editAdmin', paylod)
                message.success(res.data)
                resolve()
            }).catch((err:any)=>{
                message.error(err.data)
                reject()
            })
        })
    },

    delAdmin(context: any, paylod: string) {
        http.del('admin/delAdmin', {name: paylod}).then((res:any) => {
            context.commit('delAdmin', paylod)
            message.success(res.data)
        }).catch((err:any)=>{
            message.error(err.data)
        })
    },
};
