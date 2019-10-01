import imagesSchema from '../db/schema/images'

export const uploadImg = async (data) => {
    const result = await imagesSchema.lpush(data)
    return result
}

export const getGallery = async () => {
    const result = await imagesSchema.lrange(0, -1)
    return result
}

