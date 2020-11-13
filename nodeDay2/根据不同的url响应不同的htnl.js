const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  // 判断请求的类型
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    if (req.url === '/' || req.url === '/index.html') {
      res.end('<h2>欢迎来到首页</h2>')
    } else if (req.url === '/news') {
      res.end('<h2>欢迎来到新闻页面</h2>')
    } else {
      res.end('<h2>找不到页面 404</h2>')
    }
  }
  // // 发送的内容为中文
  // const str = `您请求的url地址是${req.url},请求的method类型是${req.method}`
  // // 设置响应头
  // res.setHeader('Content-Type', 'text/html;charset=utf8')
  // res.end(str)
})
// 监听端口
server.listen(80, () => console.log('Server running on http://127.0.0.1'))
