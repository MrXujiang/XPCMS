import RedisSchema from '../../lib/schema'

// 存放管理员数据
const adminSchema = new RedisSchema('admin', {
    id: "/admin",
    type: "object",
    properties: {
        username: {type: "string"},
        pwd: {type: "string"},
        role: {type: "number"}   // 0 超级管理员 1 普通管理员
      }
  })

export default adminSchema