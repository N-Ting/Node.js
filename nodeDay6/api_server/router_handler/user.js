//导入数据库模块
const db = require('../db/index')
//导入bcryptjs模块
const bcrypt = require('bcryptjs')
//导入生成Token的包
const jwt = require('jsonwebtoken')
//导入配置文件
const config = require('../config')
//注册的处理函数
exports.regUser = (req, res) => {
  //获取到客户端提交到服务器的数据
  const userinfo = req.body
  // console.log(userinfo);
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
    // if (err) return res.send({
    //   status: 1,
    //   message: err.message
    // })
    if (err) return res.cc(err)
    // console.log(results);
    // console.log(results.length);
    //用户名被占用
    // if (results.length > 0) return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')

    //伊奥用不承认用排它.hashSync()方法，对用户的密码进行加密处理
    // console.log(userinfo);
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log(userinfo);
    // 定义插入用户的SQL语句
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      // if (err) return console.log(err);
      // if (err) return res.send({ status: 1, message: err.message })
      if (err) return res.cc(err)
      // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
      //注册成功
      // res.send({
      //   status: 0,
      //   message: '注册成功'
      // })
      // 必须要传参，否则默认值为1
      res.cc('注册成功', 0)
    })
  })
}
//登录的处理函数
exports.login = (req, res) => {
  //接收表单数据
  const userinfo = req.body
  //定义SQL语句，查询此用户名是否存在
  const sql = `select * from ev_users where username=?`
  //查询用户的数据
  db.query(sql, userinfo.username, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //执行SQL语句成功，但是查询到数据库没有此条数据，数据条数等于1
    if (results.length !== 1) return res.cc('登录失败')
    //TODO:判断用户输入的登录密码是否和数据库中的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    //如果对比的结果等于 false，则证明用户输入的密码错误
    if (!compareResult) return res.cc('登录失败')

    //TODO:登录成功，生成Token字符串
    //剔除密码和头像的值
    const user = { ...results[0], password: '', user_pic: '' }
    //对用户信息加密，生成Token字符串，传入要加密的用户信息，密钥，token有效期为10小时
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
    //将生成的Token字符串响应给客户端
    res.send({
      status: 0,
      message: '登录成功',
      //为了方便客户端使用Token，在服务器端直接拼接上Bearer的前缀
      token: 'Bearer ' + tokenStr
    })
  })
  // res.send('login ok')
}