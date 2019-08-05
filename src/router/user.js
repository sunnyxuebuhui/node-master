const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const { method } = req
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, pwd } = req.body
    console.log(username, pwd)
    const result = loginCheck(username, pwd)
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel('登录失败')
    }
  }
}

module.exports = handleUserRouter