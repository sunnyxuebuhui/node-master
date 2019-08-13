const router = require('koa-router')()
router.prefix('/user')

router.post('/login', async (ctx, next) => {
  const { username, pwd } = ctx.request.body 

  ctx.body = {
    code: 0,
    username,
    pwd
  }
})

module.exports = router