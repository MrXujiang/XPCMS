const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const { staticPath } = require('../server/src/config')

// 自定义vue配置
module.exports = {
    // 基本路径
    publicPath: '/',   // 解决history下子路由刷新空白问题
    // 输出文件目录
    outputDir: '../server/static/adminManage',
    // webpack-dev-server 相关配置
    devServer: {
      proxy: {
        '/api': {
          target: staticPath,
          ws: true,  // 代理websocket
          changeOrigin: true
        }
      }
    },
    css: {
      loaderOptions: {
        css: {
          
        },
        less: {
          javascriptEnabled: true   // 解决.bezierEasingMixin();报错问题
        }
      }
    },
    // webpack配置
    chainWebpack: config => {
      config.resolve.alias.set('utils',resolve('./utils'))
    },
  }