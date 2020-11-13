//导入路由模块
const express = require('express')
//创建路由对象
const router = express.Router()
//挂具体的路由
router.get('/user', (req, res) => {
  res.send('GET user list')
})
router.post('/user', (req, res) => {
  res.send('And new user')
})

//向外暴露路由对象
module.exports = router