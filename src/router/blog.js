const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/**
 * 统一的登录验证函数
 * @param req
 * @returns Promise
 */
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

/**
 * 路由
 * @param req
 * @param res
 * @returns PromiseLike
 */
const handleBlogRouter= (req, res) => {
  const { method } = req
  const path = req.path
  const { author, keyword, id } = req.query
  const loginCheckResult = loginCheck(req)


  // 获取博客列表
  if (method === 'GET') {
    switch (path) {
      case '/api/blog/list':
        const rsPromise = getList(author, keyword)
        return rsPromise.then(data => {
          return new SuccessModel(data)
        })
      case '/api/blog/detail':
        const rsDetailPromise = getDetail(id)
        return rsDetailPromise.then(data => {
          return new SuccessModel(data)
        })
      default:
    }
  } else {
    switch (path) {
      case '/api/blog/new':
        if (loginCheckResult) {
          // 未登录
          return loginCheck
        }
        // mock登录人
        req.body.author = '梨'
        const newRs = newBlog(req.body)
        return newRs.then(data => {
          return new SuccessModel(data)
        })
      case '/api/blog/update':
        if (loginCheckResult) {
          // 未登录
          return loginCheck
        }

        const updateRs = updateBlog(id, req.body)
        return updateRs.then(data => {
          return data ? new SuccessModel(data) : new ErrorModel('更新博客失败')
        })
      case '/api/blog/delete':
        if (loginCheckResult) {
          // 未登录
          return loginCheck
        }

        const author = '梨'
        const delRs = deleteBlog(id, author)
        return delRs.then(data => {
          if (data) {
            return new SuccessModel()
          } else {
            return new ErrorModel('删除博客失败')
          }
        })
      default:
    }
  }
}

module.exports = handleBlogRouter