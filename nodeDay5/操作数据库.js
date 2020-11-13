//导入mysql模块
const mysql = require('mysql')
//建立与mysql数据库的链接关系
const db = mysql.createPool({
  host: '127.0.0.1',//数据库的ip地址
  user: 'root',//登录数据库的账号
  password: 'root',//登录数据库的密码
  database: 'mysql'//指定要操作那个数据库
})
//检测mysql模块能否正常的工作
// db.query('select 1', (err, results) => {
//   //mysql模块工作期间报错了
//   if (err) return console.log(err.message);
//   console.log(results);
// })

// 查询users表中所有的数据
// const sqlStr = 'select * from users'
// db.query(sqlStr, (err, results) => {
//   if (err) return console.log(err.message);
//   console.log(results);
// })

/* // 定义执行的sql语句
const user = { username: 'abc', password: 'def' }
// 待执行的sql语句，其中英文的？表示占位符
const sqlStr = 'insert into users (username,password) values(?,?)'
// 使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
  if (err) return console.log(err.message);
  // console.log(results);
  // 当等于1时表示成功
  // 可以通过affectedRows属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log('插入数据成功');
  }
}) */
/* // 便捷定义执行的sql语句
const user = { username: 'abcd', password: 'defi' }
// 待执行的sql语句，其中英文的？表示占位符
const sqlStr = 'insert into users set ?'
// 使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message);
  // console.log(results);
  // 当等于1时表示成功
  // 可以通过affectedRows属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log('插入数据成功');
  }
}) */
// // 要更新的数据对象
// const user = { id: 10, username: 'aaa', password: '0000' }
// // 要执行的sql语句
// const sqlStr = 'update users set username=?, password=? where id=?'
// // 调用db.query()执行sql语句的同时，使用数组依次为占位符指定具体的位置
// db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) {
//     console.log('更新数据成功');
//   }
// })
// 便捷方式
/* const user = { id: 10, username: 'aaaa', password: '0000' }
const sqlStr = 'update users set ? where id=?'
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) console.log('更新数据成功');
}) */
// 要执行的sql语句
// 删除数据
// const sqlStr = 'delete from users where id=?'
// db.query(sqlStr, 2, (err, results) => {
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) console.log('删除数据成功');
// })
//标记删除
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 9], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) console.log('删除数据成功');
})