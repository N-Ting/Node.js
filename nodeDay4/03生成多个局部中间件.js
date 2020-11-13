const express = require('express')
const app = express()
const m1 = (req, res, next) => {
  console.log('调用了第一次局部生效的中间件');
  next()
}
const m2 = (req, res, next) => {
  console.log('调用了第二次局部生效的中间件');
  next()
}
app.get('/', m1, m2, (req, res) => {
  res.send('Home page')
})
app.get('/user', (req, res) => {
  res.send('User page')
})
app.listen(80, () => console.log('http://127.0.0.1'))