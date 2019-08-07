const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const { method } = req

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, pwd } = req.body
    const rsData = loginCheck(username, pwd)

    return rsData.then(result => {
      if (result.username) {
        // 设置session
        req.session.username = result.username
        req.session.realname = result.realname

        // 同步到redis
        set(req.sessionId, req.session)

        return new SuccessModel()
      }

      return new ErrorModel('登录失败')
    })

  }
}

module.exports = handleUserRouter