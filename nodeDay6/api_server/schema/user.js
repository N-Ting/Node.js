//导入验证规则模块
const joi = require('@hapi/joi')
//定义用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
//密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
//定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
//定义avatar的验证规则
//dataUri()指的是如下格式的字符串
//data：image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()
//注册和登录表单的验证规则对象
exports.reg_login_schema = {
  //表示需要对req.body中的数据进行验证
  body: {
    username,
    password
  }
}
exports.update_userInfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
//验证规则对象  重置密码

exports.update_password_schema = {
  body: {
    //使用password这个规则，验证req.body.oldPwd的值
    oldPwd: password,
    //使用joi.not(joi.ref('oldPwd')).concat(password)规则，验证req.body.newPwd的值
    //joi.ref("oldPwd")表示newPwd的值等于oldPwd的值
    // joi.not(joi.ref('oldPwd'))表示newPwd的值不能等于oldPwd的值
    //.concat()用于合并joi.not(joi.ref('oldPwd'))和password这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}
//验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar
  }
}