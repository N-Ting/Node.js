//导入express模块
const express = require('express')
//创建express的服务器实例
const app = express()
//导入cors中间件
const cors = require('cors')
//将cors注册为全局中间件
app.use(cors())
//配置解析表单数据的中间件,，这个只能解析x-www-form-urlencoded格式
app.use(express.urlencoded({ extended: false }))

// 导入路由模块
const userRouter = require('./router/user')
//注册路由
app.use('/api', userRouter)
//调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007');
})