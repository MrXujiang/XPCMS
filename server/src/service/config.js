import configSchema from '../db/schema/config'

export const getConfig = async () => await configSchema.hgetall()

export const setHeader = async (headerData) => await configSchema.hmset('header', headerData)

export const setBanner = async (bannerData) => await configSchema.hmset('banner', bannerData)

export const setBannerSider = async (bannerSiderData) => await configSchema.hmset('bannerSider', bannerSiderData)

export const setSupportPay = async (supportPayData) => await configSchema.hmset('supportPay', supportPayData)
