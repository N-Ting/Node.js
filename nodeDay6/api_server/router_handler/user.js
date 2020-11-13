//导入数据库模块
const db = require('../db/index')
//导入bcryptjs模块
const bcrypt = require('bcryptjs')
//注册的处理函数
exports.regUser = (req, res) => {
  //获取到客户端提交到服务器的数据
  const userinfo = req.body
  //判断数据是否合法
  /*  if (!userinfo.username || !userinfo.password) {
     return res.send({
       status: 1,
       message: '用户名或密码不能为空'
     })
   } */
  // 定义SQL语句
  const sqlStr = 'select * from ev_users where username=?'
  //执行SQL语句并根据结果判断用户名是否被占用
  db.query(sqlStr, userinfo.username, (err, results) => {
    if (err) return res.send({
      status: 1,
      message: err.message
    })
    // console.log(results);
    // console.log(results.length);
    //用户名被占用
    if (results.length > 0) return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })

    //伊奥用不承认用排它.hashSync()方法，对用户的密码进行加密处理
    // console.log(userinfo);
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log(userinfo);
    // 定义插入用户的SQL语句
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      // if (err) return console.log(err);
      if (err) return res.send({ status: 1, message: err.message })
      if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
      //注册成功
      res.send({
        status: 0,
        message: '注册成功'
      })
    })
  })
}
//登录的处理函数
exports.login = (req, res) => {
  res.send('login ok')
}