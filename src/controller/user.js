/**
 * 登录
 * @param username
 * @param pwd
 * @returns {boolean}
 */
const loginCheck = (username, pwd) => {
  if (username === 'sunny' && pwd === '123') {
    return true
  }
  return false
}

module.exports = {
  loginCheck
}