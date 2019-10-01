import configSchema from '../db/schema/config'

export const getConfig = async () => {
    const result = await configSchema.hgetall()
    return result
}

export const setHeader = async (headerData) => {
    const result = await configSchema.hmset('header', headerData)
    return result
}

export const setBanner = async (bannerData) => {
    const result = await configSchema.hmset('banner', bannerData)
    return result
}

export const setBannerSider = async (bannerSiderData) => {
    const result = await configSchema.hmset('bannerSider', bannerSiderData)
    return result
}

export const setSupportPay = async (supportPayData) => {
    const result = await configSchema.hmset('supportPay', supportPayData)
    return result
}
