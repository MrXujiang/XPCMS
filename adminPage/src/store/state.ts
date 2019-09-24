import { State } from './type'

export const state: State = {
    name: '',
    isLogin: false,
    curScreen: '0', // 0为pc， 1为移动
    config: {
        header: {
            columns: ['首页', '产品', '技术', '运营', '商业'],
            height: '50',
            backgroundColor: '#000000',
            logo: ''
        },
        banner: {
            type: '0', // 0为标签云，1为轮播图
            label: ['人工智能', '前端', '数据分析', 'AI', '云计算'],
            bgUrl: '',
            bannerList: [
                {
                    id: 'H0001',
                    tit: '前端分享会',
                    label: ['首页'],
                    imgUrl: 'http://www.cjguanghua.com/uploadfile/2014/44/14144651782746.jpg'
                },
                {
                    id: 'H0002',
                    tit: '前端分享会',
                    label: ['首页'],
                    imgUrl: 'http://www.cjguanghua.com/uploadfile/2014/44/14144651782746.jpg'
                }
            ]
        },
        bannerSider: {
            tit: '侧边栏信息',
            imgUrl: '',
            desc: ''
        },
        supportPay: {
            tit: '',
            imgUrl: ''
        }
    },
    articles: {},
    articleList: [],
    articleDetail: null,
    admins: []
};
