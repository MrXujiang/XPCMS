// 环境参数,本地为true，测试环境为false
const isLocal = true;
const { staticPath } = require('../../server/src/config')

const dev = {
    'local': {
        '/api': staticPath,
    }
}

const prod = {
    '/wt':'http://xxx.com',
}

const env = isLocal ? dev['local'] : prod

module.exports = {env}
