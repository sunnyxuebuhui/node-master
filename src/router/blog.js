const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter= (req, res) => {
  const { method, url } = req
  const path = req.path
  const { author, keyword, id } = req.query
  let resData

  // 获取博客列表
  if (method === 'GET') {
    switch (path) {
      case '/api/blog/list':
        resData = new SuccessModel(getList(author, keyword))
        break;
      case '/api/blog/detail':
        resData = new SuccessModel(getDetail(id))
        break;
      default:
    }
  } else {
    switch (path) {
      case '/api/blog/new':
        resData = new SuccessModel(newBlog(req.body))
        console.log('body', req.body)
        break;
      case '/api/blog/update':
        const updateData = updateBlog(id, req.body)
        resData = updateData ? new SuccessModel(updateData) : new ErrorModel('error')
        break;
      case '/api/blog/delete':
        const delData = deleteBlog(id)
        resData = delData ? new SuccessModel(delData) : new ErrorModel('error')
        break;
      default:
    }
  }
  return resData
}

module.exports = handleBlogRouter