/**   
 * app.use用来注册中间件，先收集起来
 * 遇到http请求，通过method和path来判断触发哪些
 * 实现next机制，即上一个通过next触发下一个
*/

const http = require('http')
const slice = Array.prototype.slice

class ExpressMiddleware {
  constructor () {
    // 存放中间件列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register (path) {
    let info = {}
    if (typeof path === 'string') {
      info.path = path 
      // 从第二个参数开始，转换成数组， 存入stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    console.log('info:', info)

    return info
  }

  use () {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get () {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post () {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  /**
   * 核心的next机制
   * @param {*} req 
   * @param {*} res 
   * @param {*} stack 
   */
  handle (req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }

    next()
  }

  /**
   * 匹配当前路径对应的中间件回调函数
   * @param {*} method 
   * @param {*} url 
   */
  match (method, url) {
    let stack = []
    if (url === '/favicon.ico') return stack

    // 获取routes
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack)
      }
    })
    console.log('stack:', stack)
    return stack
  }

  /**  
   * 创建服务的回调函数
   */
  callback () {
    return (req, res) => {
      const { url } = req
      const method = req.method.toLowerCase()

      res.json = data => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }

  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new ExpressMiddleware()
}