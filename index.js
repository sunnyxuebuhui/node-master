const http = require('http')
const querystring = require('querystring')


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

const server = http.createServer((req, res) => {
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

})



server.listen(8000)
console.log('8000 server is runing')