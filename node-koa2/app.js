const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')
const user = require('./routes/user')

const { REDIS_CONFIG } = require('./config/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session配置
app.keys = ['!@#$~%^&*()_+9999_']
app.use(session({
  // 配置cookie
  cookie: {
    path: '/', 
    httpOnly: true,
    maxAge:  24 * 60 * 60 * 1000
  },
  
  // 配置redis
  store: redisStore({
    // all: '127.0.0.1:6379'
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(user.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
