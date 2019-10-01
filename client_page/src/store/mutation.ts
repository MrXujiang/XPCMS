import { 
    State,
    Config, 
    HeaderType, 
    Banner,
    BannerSider,
    SupportPay
} from './type'

export default {
    // 预览模式
    setScreen(state: State, payload: string) {
        state.curScreen = payload;
    },

    // 初始化配置
    setConfig(state: State, payload: Config) {
        state.config = payload;
    },

    /******* header *******/
    // 添加栏目
    addColumn(state: State, payload: string) {
        state.config.header.columns.push(payload);
    },

    // 删除栏目
    delColumn(state: State, payload: string) {
        const delIndex = state.config.header.columns.indexOf(payload);
        state.config.header.columns.splice(delIndex, 1);
    },

    // 设置栏目高度
    setColumnHeight(state: State, payload: string) {
        state.config.header.height = payload;
    },

    // 设置栏目背景色
    setColumnBgColor(state: State, payload: string) {
        state.config.header.backgroundColor = payload;
    },

    // 设置logo
    setLogo(state: State, payload: string) {
        state.config.header.logo = payload;
    },

    saveHeader(state: State, payload: HeaderType) {
        state.config.header = payload
    },

    /********* banner *********/
    // 设置bannerType
    setBannerType(state: State, payload: string) {
        state.config.banner.type = payload;
    },

    // 设置banner背景
    setBannerBg(state: State, payload: string) {
        state.config.banner.bgUrl = payload;
    },

    // 添加标签云
    addBannerLabel(state: State, payload: string) {
        state.config.banner.label.push(payload);
    },

    // 删除标签云
    delBannerLabel(state: State, payload: string) {
        let delIndex = state.config.banner.label.indexOf(payload);
        state.config.banner.label.splice(delIndex, 1);
    },

    // 删除banner图
    delBanner(state: State, payload: number) {
        state.config.banner.bannerList.splice(payload, 1);
    },

    // 添加banner图
    addBanner(state: State, payload: object) {
        state.config.banner.bannerList.push(payload);
    },

    // 修改banner图
    editBanner(state: State, payload: any) {
        let index = +payload.id.slice(-1) -1;
        state.config.banner.bannerList[index] = payload;
    },

    // 保存banner配置
    saveBanner(state: State, payload: Banner) {
        state.config.banner = {...state.config.banner, ...payload}
    },

    /********* bannerSider *********/
    setBannerSiderTit(state: State, payload: string) {
        state.config.bannerSider.tit = payload;
    },

    setBannerSiderImgUrl(state: State, payload: string) {
        state.config.bannerSider.imgUrl = payload;
    },

    saveBannerSider(state: State, payload: BannerSider) {
        state.config.bannerSider = payload;
    },

    /********* 添加文章 *********/
    addArticle(state: State, payload: any) {
        let articles = state.articles;
        let list = articles[payload.label];
        if(list) {
            articles[payload.label].push(payload);
        }else {
            articles[payload.label] = [payload];
        }

        // 更新列表
        state.articleList = Object.keys(articles).reduce((acc: any, prev: any) => acc.concat(articles[prev]), [])
    },

    editArticle(state: State, payload: any) {
        if(payload.label === payload.prevLabel) {
            let list = state.articles[payload.label] || [];
            let index = 0;
            list.forEach((item: any, i: number) => {
                if(item.id === payload.id) {
                    index = i;
                    return
                }
            })
            list[index] = payload;
        }else {
            let list = state.articles[payload.prevLabel] || [];
            let index = 0;
            list.forEach((item: any, i: number) => {
                if(item.id === payload.id) {
                    index = i;
                    return
                }
            })
            list.splice(index, 1);
            delete payload.prevLabel;
            // payload.id
            state.articles[payload.label] ? state.articles[payload.label].push(payload) : (state.articles[payload.label] = [payload]);
        }
    },

    getArticles(state: State, payload: any) {
        state.articles = payload
        let list = Object.keys(payload).reduce((acc: any, prev: any) => acc.concat(payload[prev]), [])
        state.articleList = list
    },

    delArticle(state: State, payload: any) {
        let list = state.articleList;
        let articles = state.articles[payload.label];
        state.articles[payload.label] = articles.filter((item: any) => item.id !== payload.id);
        state.articleList = list.filter((item: any) => item.id !== payload.id);
    },

    getArticleDetail(state: State, payload: any) {
        let list = state.articles[payload.label];
        state.articleDetail = list && list.filter((item: any) => item.id === payload.id) || []
    },

    emptyArticle(state: State) {
        state.articleDetail = null;
    },

    // 设置支付配置
    saveSupportPay(state: State, payload: SupportPay) {
        state.config.supportPay = payload;
    },

    setSupportPayImgUrl(state: State, payload: string) {
        state.config.supportPay.imgUrl = payload;
    },

    // 管理员
    getAdmins(state: State, payload: any) {
        state.admins = payload
    },

    addAdmin(state: State, payload: any) {
        state.admins.push(payload)
    },

    editAdmin(state: State, payload: any) {
        state.admins = state.admins.map((item:any) => {
            return payload.prevName === item.username ? payload : item
        })
    },

    delAdmin(state: State, payload: string) {
        state.admins = state.admins.filter((item:any) => {
            return item.username !== payload
        })
    }
};
