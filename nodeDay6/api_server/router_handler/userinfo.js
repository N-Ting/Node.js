//创建路由处理函数模块
//导入数据库操作模块
const db = require('../db/index')
//导入bcrypt.js后
const bcrypt = require('bcryptjs')
//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  //根据用户的id，查询用户的基本信息
  const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`
  //调用db.query()执行SQL语句
  //req对象上的user属性，是Token解析成功，express-jwt中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //执行SQL语句成功，但是查询到的数据条数不等于1,表示数据库中没有指定的id用户
    if (results.length !== 1) return res.cc('获取用户信息错误')
    //将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户信息成功',
      data: results[0]
    })
  })
  // res.send('ok')
}
//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  //定义带执行的SQL语句，更新用户信息
  const sql = `update ev_users set ? where id = ?`
  //调用db.query()
  db.query(sql, [req.body, req.body.id], (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //执行SQL语句成功，但影响行数不为1，表示数据库中没有这条数据
    if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

  })
  res.send('ok')
}
//重置密码的处理函数
exports.updatePassword = (req, res) => {
  // res.send('ok')
  //定义根据id插叙用户数据的SQL语句
  const sql = `select * from ev_users where id=?`
  //执行db.query()方法，查询用户是否存在
  db.query(sql, req.user.id, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //检查指定id的用户是否存在
    if (results.length !== 1) return res.cc('用户不存在！')
    //TODO:判断提交的旧密码是否正确
    //判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    // console.log(compareResult);
    if (!compareResult) return res.cc('原密码错误！')

    //定义更新用户密码的SQL语句
    const sql = `update ev_users set password=? where id=?`
    //对新秘密吗进行bcrypt加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    //执行SQL语句，根据id更新用户的密码
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      //SQL语句执行失败
      if (err) return res.cc(err)
      //SQL语句执行成功，但影响行数不等于1
      if (results.affectedRows !== 1) return res.cc('更新密码失败')
      res.cc("更新密码成功", 0)
    })

  })
}
//更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  //定义更新用户头像的SQL 语句
  const sql = `update ev_users set user_pic=? where id=?`
  //调用db.query()
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //执行SQL语句成功，但影响的行数不等于1，表示数据库中没有这条数据
    if (results.affectedRows !== 1) return res.cc('更新头像失败！')
    res.cc('更新头像成功！', 0)
  })

}