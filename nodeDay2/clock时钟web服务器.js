const http = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer()
server.on('request', (req, res) => {
  // 获取到客户端的url地址
  const url = req.url
  // 定义一个空的字符串
  let fpath = ''
  if (url === '/') {
    fpath = path.join(__dirname, 'clock', 'index.html')
  } else {
    fpath = path.join(__dirname, 'clock', url)
  }
  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    if (err) return res.end('读取文件失败！')
    res.end(dataStr)
  })
})
server.listen(80, () => {
  console.log('Server running on http://127.0.0.1')
})