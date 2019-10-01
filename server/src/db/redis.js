import Redis from 'ioredis'

const redisUrl = '127.0.0.1:6379'
const redis = new Redis(redisUrl)

export default redis