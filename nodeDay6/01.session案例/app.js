// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：请配置 Session 中间件
//导入session中间件
const session = require('express-session')
//配置session中间件
app.use(session({
  secret: 'keyboard cat', //secret属性的值可以为任意字符串
  resave: false,//固定写法
  saveUninitialized: true//固定写法
}))

// 托管静态页面
app.use(express.static('./pages'))
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false }))

// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  console.log(req.session.id);
  req.session.user = req.body //自定义一个user，将用户信息挂载到user上
  req.session.islogin = true//用户登录状态

  res.send({ status: 0, msg: '登录成功' })
})

// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  //判断用户是否登录
  if (!req.session.islogin) return res.send({ status: 1, msg: 'fail' })
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
})

// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  //清空当前客户端的session信息
  req.session.destroy()//调用destroy()指回清空当前用户session信息
  res.send({
    status: 0,
    msg: '退出登录成功'
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1:80')
})