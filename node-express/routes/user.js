var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const { username, pwd } = req.body
  res.json({
    code: 0,
    data: {
      username,
      pwd
    }
  })
});

module.exports = router;
