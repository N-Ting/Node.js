//导入express
const express = require('express')
//创建服务器实例
const app = express()
//配置解析表单数据的中间件，要在路由模块之前
app.use(express.urlencoded({ extended: false }))
//在路由之前，配置cors这个中间件，从而解决接口跨域问题
const cors = require('cors')
//配置中间件
app.use(cors())
// 导入路由模块
const router = require('./apiRouter')
//注册路由,设置统一的访问路径
app.use('/api', router)


//启动服务器
app.listen(80, () => console.log('express server running at http://127.0.0.1'))