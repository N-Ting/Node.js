//导入express
const express = require('express')
//创建服务器
const app = express()
//注册路由模块
//不加前缀
// app.use(require('./route.js'))
//加前缀
app.use('/api', require('./route.js'))
//监听端口
app.listen(80, () => {
  console.log('http://127.0.0.1');
})