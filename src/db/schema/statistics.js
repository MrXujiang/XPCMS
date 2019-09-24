import RedisSchema from '../../lib/schema'

// 存放网站统计数据
const statisticsSchema = new RedisSchema('statistics', {
    id: "/statistics",
    type: "object",
    properties: {
      "views": {type: "number"}
    }
  })

export default statisticsSchema