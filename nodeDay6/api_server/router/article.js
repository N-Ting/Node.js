//发布新文章路由

//导入express
const express = require('express')
//创建路由对象
const router = express.Router()
//导入解析formdata格式表单数据的包
const multer = require('multer')
//导入处理路径核心模块
const path = require('path')
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//创建multer的实例对象，通过dest属性指定文件的存在路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
//导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')
//导入文章的验证模块
const { add_article_schema } = require('../schema/article')
//发布新文章的路由
//upload.single()是一个局部生效的中间件，用来解析FormData格式的表单数据
//将文件类型的数据，解析并挂载到req.file属性中
//将文本类型的数据，解析并挂载到req.body属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)
//向外共享路由对象
module.exports = router