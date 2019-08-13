const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

/**
 * getPostData
 * 处理post方式数据
 */
const getPostData = req => {
  return new Promise((resolve, reject) => {
    // post是异步 参数是json格式
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }

      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req,  res) => {
  // 记录 access log日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回数据格式 JSON
  res.setHeader('Content-type', 'application/json')

  // path
  const { url } = req
  req.path = url && url.split('?')[0]

  // query
  req.query = querystring.decode(url && url.split('?')[1])

  // 解析 cookie
  // 格式 k1=v1; k2=v2; k3=v3
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''  
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析 session (使用redis)
  let needSetCookie = false
  let userId = req.cookie.userid

  // 未登录
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis 中的 session 值
    set(userId, {})
  }
  // 获取session
  req.sessionId = userId
  // 通过登录的cookie值中的id去获取对应的用户信息
  get(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      // 初始化设置 redis 中的 session 值
      set(req.sessionId, {})
      req.session = {}
    } else {
      // 设置session
      req.session = sessionData
    }

    // 处理 post data
    return getPostData(req)
  }).then(postData => {
    req.body = postData

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理login路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 路由不匹配 404
    res.writeHead(404, {"content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
  })


}

module.exports = serverHandle