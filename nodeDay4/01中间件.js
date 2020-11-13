const express = require('express')
const app = express()
// 定义一个最简单的中间件
const mw = (req, res, next) => {
  console.log('hello');
  next()
}
//全局生效的中间件
app.use(mw)
app.get('/', (req, res) => {
  console.log('word');
})
app.listen(80, () => {
  console.log('http://127.0.0.1');
})