const { exec } = require('../db/mysql')

/**
 * 登录
 * @param username
 * @param pwd
 * @returns {boolean}
 */
const loginCheck = (username, pwd) => {
  const sql = `
   select * from users where username = '${username}' and password = '${pwd}';
  `
  return exec(sql).then(data => {
    return data[0] || {}
  })
}

module.exports = {
  loginCheck
}