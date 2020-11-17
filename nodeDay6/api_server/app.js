//导入express模块
const express = require('express')
//创建express的服务器实例
const app = express()
const joi = require('@hapi/joi')
//导入cors中间件
const cors = require('cors')
//将cors注册为全局中间件
app.use(cors())
//配置解析表单数据的中间件,，这个只能解析x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: false }))
//要在路由之前，封装res.cc
app.use(function (req, res, next) {
  //status=0为成功；status=1为失败，默认将status的值设置为1
  res.cc = function (err, status = 1) {
    res.send({
      status,
      //状态描述，判断err是错误对象还是字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
//要在路由之前配置解析Token的中间件
//导入配置文件
const config = require('./config')
//导入解析token的中间件
const expressJWT = require('express-jwt')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 导入路由模块
const userRouter = require('./router/user')
//注册路由
app.use('/api', userRouter)
//导入并使用用户信息 路由模块
const userinfoRouter = require('./router/userinfo')
//注册路由模块
app.use('/my', userinfoRouter)
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)
//导入并使用文章路由模块
const articleRouter = require('./router/article')
//注册路由并挂载统一访问前缀
app.use('/my/article', articleRouter)
//托管静态资源文件
app.use('/uploads', express.static('./uploads'))
//注册全局错误级别中间件，捕获验证失败
app.use(function (err, req, res, next) {
  //数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // res.cc(err)
  //捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
})
//调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007');
})