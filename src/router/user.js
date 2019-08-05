const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const { method } = req
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, pwd } = req.body
    const rsData = loginCheck(username, pwd)

    return rsData.then(result => {
      if (result) {
        return new SuccessModel(result)
      }
      return new ErrorModel('登录失败')
    })

  }
}

module.exports = handleUserRouter