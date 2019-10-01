import RedisSchema from '../../lib/schema'

// 存放管理员数据
const articleSchema = new RedisSchema('article', {
    id: "/article",
    type: "object",
    patternProperties: {
        "^[a-z0-9]+$": {
          "type": "object",
          properties: {
              tit: { type: "string" },
              label: { type: "string" },
              faceUrl: { type: "string" },
              desc: { type: "string" },
              time: { type: "string" },
              views: { type: "number" },
              flover: { type: "number" }, 
              articleUrl: { type: "string" }
          }
        }
      }
  })

export default articleSchema