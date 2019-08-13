const { exec } = require('../db/mysql')

/**
 * 获取博客列表
 * @param author
 * @param keyword
 * @returns {*[]}
 */
const getList = async (author = null, keyword = null) => {
  // 获取数据库数据
  let sql = `select * from blogs where 1 = 1 `

  if (author) {
    sql += `and author = '${author}' `
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  // 返回promise
  return await exec(sql)
}

/**
 * 获取博客详情
 * @param id
 * @returns {{createTime: number, author: string, id: number, title: string, content: string}}
 */
const getDetail = async (id) => {
  let sql = `select * from blogs where id = '${id}';`
  let data = await exec(sql)
  return data[0]
}

/**
 * 新增博客
 * @param blogData
 * @returns {{id: number}}
 */
const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = +new Date()

  const sql = `
    insert into blogs (title, content, author, createtime )
    values ('${title}', '${content}', '${author}', '${createtime}')
  `
  const data = exec(sql)
  return {
    id: data.insertId
  }
}

/**
 * 更新博客
 * @param id
 * @param blogData
 * @returns {boolean}
 */
const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title = '${title}', content = '${content}' where id = '${id}';`
  const data = await exec(sql)
  if (data.affectedRows > 0) {
    return true
  }
  return false
}

/**
 * 删除博客
 * @param id
 * @returns {boolean}
 */
const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id = '${id}' and author = '${author}';`
  const data = exec(sql)
  if (data.affectedRows > 0) {
    return true
  }
  return false
}



module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}