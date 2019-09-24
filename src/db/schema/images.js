import RedisSchema from '../../lib/schema'

// 存放图片数据
const imagesSchema = new RedisSchema('images', {
    id: "/images",
      type: "object",
      properties: {
        source: { type: "string" },
        url: { type: "string" }
      }
  })

export default imagesSchema