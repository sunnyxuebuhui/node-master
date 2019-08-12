var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', function(req, res, next) {
  const { author, keyword } = req.query
  const rsPromise = getList(author, keyword)
  return rsPromise.then(data => {
    res.json(new SuccessModel(data)) 
  })
});

module.exports = router;
