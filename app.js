const querystring = require('querystring')
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
  // 设置返回数据格式 JSON
  res.setHeader('Content-type', 'application/json')

  // path
  const { url } = req
  req.path = url && url.split('?')[0]

  // query
  req.query = querystring.decode(url && url.split('?')[1])

  /**
   * promise
   * post
   * data
   */
  getPostData(req).then(postData =>{
    req.body = postData

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理login路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData))
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






/*const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('method: ', req.method )

    const url = req.url
    console.log('url: ', url)

    // querystring.decode() 是 querystring.parse() 的别名

    req.query = querystring.decode(url.split('?')[1])
    console.log('query: ', req.query)

    // querystring.encode() 是 querystring.stringify() 的别名

    res.end(JSON.stringify(req.query))
  }
  else
  {
    // req数据格式
    console.log('req content-type: ', req.headers['content-type'])

    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', chunk => {
      console.log('postData: ', postData)
      res.end('POST is end')
    })
  }

})*/

/*const server = http.createServer((req, res) => {
  const { method, url } = req
  const path = url && url.split('?')[0]
  const query = querystring.parse(url && url.split('?')[1])

  // 设置返回数据格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  } else {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }

})*/

