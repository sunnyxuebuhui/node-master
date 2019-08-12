// 环境参数配置
const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'dev') {
  // mysql
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'tao568312ING',
    port: '3306',
    database: 'myblog'
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
} else if (env === 'production') {
  // mysql
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'tao568312ING',
    port: '3306',
    database: 'myblog'
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}