//导入express
const express = require('express')
//创建web服务器
const app = express()
// 发送get请求
app.get('/liuhanhan', (req, res) => {
  // 向客户端请求数据
  res.send({ name: 'liuhanhan', age: '24', gender: '男' })
})
// 发送post请求
app.post('/liuhanhan', (req, res) => {
  res.send('请求成功')
})
app.listen(80, () => {
  console.log('http://127.0.0.1');
})
