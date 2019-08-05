const { exec } = require('../db/mysql')

/**
 * 获取博客列表
 * @param author
 * @param keyword
 * @returns {*[]}
 */
const getList = (author = null, keyword = null) => {
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
  return exec(sql)
}

/**
 * 获取博客详情
 * @param id
 * @returns {{createTime: number, author: string, id: number, title: string, content: string}}
 */
const getDetail = id => {
  let sql = `select * from blogs where id = '${id}';`
  return exec(sql).then(data => {
    return data[0]
  })

}

/**
 * 新增博客
 * @param blogData
 * @returns {{id: number}}
 */
const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = +new Date()

  const sql = `
    insert into blogs (title, content, author, createtime )
    values ('${title}', '${content}', '${author}', '${createtime}')
  `
  return exec(sql).then(data => {
    console.log(11111, data)
    return {
      id: data.insertId
    }
  })
}

/**
 * 更新博客
 * @param id
 * @param blogData
 * @returns {boolean}
 */
const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title = '${title}', content = '${content}' where id = '${id}';`
  return exec(sql).then(data => {
    if (data.affectedRows > 0) {
      return true
    }
    return false
  })
}

/**
 * 删除博客
 * @param id
 * @returns {boolean}
 */
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id = '${id}' and author = '${author}';`
  return exec(sql).then(data => {
    if (data.affectedRows > 0) {
      return true
    }
    return false
  })
}



module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}