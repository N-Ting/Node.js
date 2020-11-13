//导入路由模块
const express = require('express')
//调用express.Router()
const router = express.Router()

// 编写 get接口
router.get('/get', (req, res) => {
  //获取到客户端通过查询字符串，发送到服务器的请求
  const query = req.query
  // 通过send方法，把数据响应给客户端
  res.send({
    status: 0,//状态0表示车鞥个，1表示失败
    msg: 'GET请求成功',//状态描述
    data: query//需要响应给客户端的具体数据
  })
})

//编写post接口
router.post('/post', (req, res) => {
  //获取到客户端通过请求体，发送到服务器的URL-encoded数据
  const body = req.body
  //通过send方法，把数据响应给客户端
  res.send({
    status: 0,
    msg: 'post请求成功',
    data: body
  })
})
//注意：如果要获取URL-encoded格式的请求体数据，必须配置配置中间件app.use(express.urlencoded({extended:false}))
//向外暴露
module.exports = router