//导入http模块
const http = require('http')
//根据http创建服务器对象
const server = http.createServer()
//监听客户端的请求
server.on('request', (req, res) => {
  // 往客户端发送一个hello word
  res.end('hello word');
})
//监听端口
server.listen(80, () => console.log('Server running on http://127.0.0.1'))