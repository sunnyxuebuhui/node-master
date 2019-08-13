const http = require('http')

const componse = (middlewareList) => {
  return function (ctx) {
    function dispatch(i) {
      const fn = middlewareList[i]
      // 若最后一个中间件，返回一个resolve的promise
      if (i === middlewareList.length) return Promise.resolve()
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch(err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}

class LikeKoa2 {
  constructor () {
    this.middlewareList = []
  }

  use (fn) {
    this.middlewareList.push(fn)
    return this
  }

  createContext (req, res) {
    const ctx = {
      res, 
      req
    }
    return ctx
  }

  handle (ctx, fn) {
    return fn(ctx)
  }

  callback () {
    const fn = componse(this.middlewareList)

    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handle(ctx, fn)
    }
  }

  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2