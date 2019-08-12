// mock express next()实现
const express = require('./express-middleware')

// 执行http请求
const app = express()

app.use((req, res, next) => {
  console.log('请求开始: ', req.methos, req.url)
  next()
})

app.use((req, res, next) => {
  // mock cookie
  console.log('处理cookie')
  req.cookie = {
    userId: '123456789'
  }
  next()
})

app.use('/api', (req, res, next) => {
  console.log('api处理路由')
  next()
})

const loginCheck = (req, res, next) => {
  setTimeout(() => {
    console.log('登录成功')
    next()
  })
}

app.use('/api/get-cookie', loginCheck, (req, res) => {
  console.log('get /api/get-cookie')
  res.json({
    code: 0,
    data: req.cookie
  })
})

app.listen(5682, () => {
  console.log('5683 port is running')
})