
const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG)

redisClient.on('error', err => {
  console.error(err)
})


const set = (key, val) => {
  if (typeof  val === "object") val = JSON.stringify(val)
  redisClient.set(key, val, redis.print)
}

const get = key => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      if (result === null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(result))
      } catch (e) {
        resolve(result)
      }
    })
  })
}

module.exports = {
  set,
  get
}
