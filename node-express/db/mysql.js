const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 开始链接
con.connect()

// 封装成promise执行mysql
const exec = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        console.error(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}