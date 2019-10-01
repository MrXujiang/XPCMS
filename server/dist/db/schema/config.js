"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("../../lib/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 存放配置信息数据
const configSchema = new _schema.default('config', {
  id: "/config",
  type: "object",
  properties: {
    header: {
      type: "object",
      properties: {
        columns: {
          type: "array",
          items: {
            type: "string"
          }
        },
        height: {
          type: "string"
        },
        backgroundColor: {
          type: "string"
        },
        logo: {
          type: "string"
        }
      }
    },
    banner: {
      type: "object",
      properties: {
        type: {
          type: "string"
        },
        columns: {
          type: "array",
          items: {
            type: "string"
          }
        },
        bgUrl: {
          type: "string"
        },
        bannerList: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              tit: {
                type: "string"
              },
              label: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              imgUrl: {
                type: "string"
              }
            }
          }
        }
      }
    },
    bannerSider: {
      type: "object",
      properties: {
        tit: {
          type: "string"
        },
        imgUrl: {
          type: "string"
        }
      }
    },
    supportPay: {
      type: "object",
      properties: {
        tit: {
          type: "string"
        },
        imgUrl: {
          type: "string"
        }
      }
    }
  }
}); // 初始化config数据

async function initConfig() {
  const isExist = await configSchema.exists();

  if (!isExist) {
    const result = await configSchema.hmset(null, {
      header: {
        columns: ['首页'],
        height: '50',
        backgroundColor: '#000000',
        logo: ''
      },
      banner: {
        type: '1',
        // 0为标签云，1为轮播图
        label: [],
        bgUrl: '',
        bannerList: []
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
    });

    if (!Array.isArray(result)) {
      console.log('配置信息初始化完成');
    } else {
      throw result;
    }
  }
}

initConfig();
var _default = configSchema;
exports.default = _default;