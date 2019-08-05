/**
 * 获取博客列表
 * @param author
 * @param keyword
 * @returns {*[]}
 */
const getList = (author = null, keyword = null) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1564879792840,
      author: 'sunny'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1564879824311,
      author: 'star'
    }
  ]
}

/**
 * 获取博客详情
 * @param id
 * @returns {{createTime: number, author: string, id: number, title: string, content: string}}
 */
const getDetail = id => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1564879792840,
    author: 'sunny'
  }
}

/**
 * 新增博客
 * @param blogData
 * @returns {{id: number}}
 */
const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

/**
 * 更新博客
 * @param id
 * @param blogData
 * @returns {boolean}
 */
const updateBlog = (id, blogData = {}) => {
  return true
}

/**
 * 删除博客
 * @param id
 * @returns {boolean}
 */
const deleteBlog = (id) => {
  return false
}



module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}