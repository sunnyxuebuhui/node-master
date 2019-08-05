// 环境参数配置
const env = process.env.NODE_ENV

let MYSQL_CONFIG

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'tao568312ING',
    port: '3306',
    database: 'myblog'
  }
} else if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'tao568312ING',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONFIG
}