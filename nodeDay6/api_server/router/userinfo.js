//创建获取用户的基本信息路由模块
//导入express
const express = require('express')
//创建路由对象
const router = express.Router()
//导入用户信息的处理函数模快
const userInfo_handler = require('../router_handler/userinfo')
//导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证密码规则对象
const { update_userInfo_schema, update_password_schema } = require('../schema/user')
//导入需要验证头像规则对象
const { update_avatar_schema } = require('../schema/user')
//获取用户的基本信息
router.get('/userinfo', userInfo_handler.getUserInfo)
//更新用户的基本信息
router.post('/userinfo', expressJoi(update_userInfo_schema), userInfo_handler.updateUserInfo)
//重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userInfo_handler.updatePassword)
//更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfo_handler.updateAvatar)
//向外共享路由模块
module.exports = router