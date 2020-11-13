const express = require('express')
const app = express()
// 定义路由
app.get('/', (req, res) => {
  throw new Error('服务器发生错误')
  res.send('Home page')
})
// 定义错误级别中间件，捕获整个项目的异常错误，防止崩溃
app.use((err, req, res, next) => {
  console.log('发生错误' + err.message);
  res.send('Error:' + err.message)
})
app.listen(80, () => console.log('http://127.0.0.1'))