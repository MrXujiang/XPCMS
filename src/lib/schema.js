import { validate } from 'jsonschema'
import Redis from 'ioredis'

const redis = new Redis()

class RedisSchema {
    constructor(schemaName, schema) {
        this.schemaName = schemaName
        this.schema = schema
        this.redis = redis
    }

    validate(value, schema, cb) {
        const { valid, errors } = validate(value, schema);
        if(valid) {
            return cb()
        }else {
            return errors.map(item => item.stack)
        }
    }

    get() {
        return this.redis.get(this.schemaName)
    }

    // 获取整个hash对象
    hgetall() {
        return this.redis.hgetall(this.schemaName)
    }

    // 获取指定hash对象的属性值
    hget(key) {
        return this.redis.hget(this.schemaName, key)
    }

    //  通过索引获取列表中的元素
    lindex(index) {
        return this.redis.lindex(this.schemaName, index)
    }

    //  获取列表中指定范围的元素
    lrange(start, end) {
        return this.redis.lrange(this.schemaName, start, end)
    }

    // 获取列表的长度
    llen() {
        return this.redis.llen(this.schemaName)
    }

    // 检测某个schemaName是否存在
    exists() {
        return this.redis.exists(this.schemaName)
    }

    // 给某个schemaName设置过期时间,单位为秒
    expire(time) {
        return this.redis.expire(this.schemaName, time)
    }

    // 移除某个schemaName的过期时间
    persist() {
        return this.redis.persist(this.schemaName)
    }

    // 修改schemaName名
    rename(new_schemaName) {
        return this.redis.rename(this.schemaName, new_schemaName)
    }


    set(value, time) {
        return this.validate(value, this.schema, () => {
            if(time) {
                return this.redis.set(this.schemaName, value, "EX", time)
            }else {
                return this.redis.set(this.schemaName, value)
            }
        })
    }

    // 将某个schema的值自增指定数量的值
    incrby(num) {
        return this.redis.incrby(this.schemaName, num)
    }

    // 将某个schema的值自增指定数量的值
    decrby(num) {
        return this.redis.decrby(this.schemaName, num)
    }

    hmset(key, value) {
        if(key) {
            if(this.schema.properties){
                return this.validate(value, this.schema.properties[key], () => {
                    return this.redis.hmset(this.schemaName, key, JSON.stringify(value))
                })
            }else {
                return this.validate(value, this.schema.patternProperties["^[a-z0-9]+$"], () => {
                    return this.redis.hmset(this.schemaName, key, JSON.stringify(value))
                })
            }
            
        }else {
            return this.validate(value, this.schema, () => {
                // 将第一层键值json化，以便redis能正确存储键值为引用类型的值
                for(key in value) {
                    let v = value[key];
                    value[key] = JSON.stringify(v);
                }
                return this.redis.hmset(this.schemaName, value)
            })
        }
    }

    hincrby(key, num) {
        return this.redis.hincrby(this.schemaName, key, num)
    }

    lpush(value) {
        return this.validate(value, this.schema, () => {
            return this.redis.lpush(this.schemaName, JSON.stringify(value))
        })
    }

    lset(index, value) {
        return this.redis.lset(this.schemaName, index, JSON.stringify(value))
    }

    lrem(count, value) {
        return this.redis.lrem(this.schemaName, count, value)
    }

    del() {
        return this.redis.del(this.schemaName)
    }

    hdel(key) {
        return this.redis.hdel(this.schemaName, key)
    }
}

export default RedisSchema