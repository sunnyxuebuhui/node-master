const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter= (req, res) => {
  const { method, url } = req
  const path = req.path
  const { author, keyword, id } = req.query

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
        // mock登录人
        req.body.author = '梨'
        const newRs = newBlog(req.body)
        return newRs.then(data => {
          return new SuccessModel(data)
        })
      case '/api/blog/update':
        const updateRs = updateBlog(id, req.body)
        return updateRs.then(data => {
          return data ? new SuccessModel(data) : new ErrorModel('更新博客失败')
        })
      case '/api/blog/delete':
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