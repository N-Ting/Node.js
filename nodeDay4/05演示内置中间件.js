const express = require('express')
const app = express()
//注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过express.json()这个中间件，解析表单中的json格式的数据
app.use(express.json())
// 发送post请求
app.post('/user', (req, res) => {
  //在服务器，可以使用req.body这个属性，来接收客户端发过来的氢气体数据
  console.log(req.body);
  res.send('ok');
})
app.post('/book', (req, res) => {
  // 在服务器端，可以通过req.body来获取json格式和
})
app.listen(80, () => {
  console.log('http://127.0.0.1');
})