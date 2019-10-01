export interface State {
    name: string;
    isLogin: boolean;
    config: Config;
    [propName: string]: any;  // 用来定义可选的额外属性
}

export interface Config {
    header: HeaderType,
    banner: Banner,
    bannerSider: BannerSider,
    supportPay: SupportPay
}

export interface HeaderType {
    columns: string[],
    height: string,
    backgroundColor: string,
    logo: string
}

export interface Banner {
    type: string,
    label: string[],
    bgUrl: string,
    bannerList: any[]
}

export interface BannerSider {
    tit: string,
    imgUrl: string,
    desc: string
}

export interface SupportPay {
    tit: string,
    imgUrl: string
}

// 处理相应的类型
export interface Response {
    [propName: string]: any;
}