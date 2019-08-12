let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let blogRouter = require('./routes/blog')
let userRouter = require('./routes/user')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * 生成日志
 * 类似app.js手动生成日志access.log
 */
app.use(logger('dev'));

/** 
 * 类似app.js里面的getPostData方法
 * 处理post方法data
 */
app.use(express.json());

/**   
 * 处理不同的数据格式
 */
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'sunny&*^%$#@!~8888',
  cookie: {
     path: '/',
     httpOnly: true,
     maxAge: 24 * 60 * 60 * 1000
  }
}))

/**
 * 解析cookie
 * 类似app.js里面req.headers.cookie手动解析cookie
 * 一般获取登录用户cookie里面的userId
 */
app.use(cookieParser());

/**  
 * 将静态文件目录设置为：项目根目录 +/public
*/
app.use(express.static(path.join(__dirname, 'public')));


/**  
 * / 根路径
 * cookie中userId去对应session中的id
 * 然后就是路由处理 
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
