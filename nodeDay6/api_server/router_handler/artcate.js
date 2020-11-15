
//导入数据库操作模块
const db = require('../db/index')

//获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  //定义SQL语句
  //根据分类的状态，获取所有为被删除的分类列表数据
  //is_delete为0表示没有被标记为删除的数据
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
  //调用db.query()
  db.query(sql, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //执行SQL语句成功
    res.send({
      status: 0,
      message: '获取文章分类成功！',
      data: results
    })
  })
}
//新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  //定义查询 分类名称与分类别名是否被占用SQL语句
  const sql = `select * from ev_article_cate where name=? or alias=?`
  //调用db.query()
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //执行SQL语句成功，但是分类名称和分类别名都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    //新增文章分类
    //定义新增文章分类的SQL语句
    const sql = `insert into ev_article_cate set ?`
    //调用db.query()
    db.query(sql, req.body, (err, results) => {
      //SQL语句执行失败
      if (err) return res.cc(err)
      //SQL语句执行成功，但影响的行数不等于1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
      res.cc('新增文章分类成功', 0)
    })
  })
}
//删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  //定义删除文章分类的 SQL 语句
  const sql = `update ev_article_cate set is_delete=1 where id=?`
  // 调用 db.query()
  db.query(sql, req.params.id, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //SQL 语句执行成功，但是影响行数不等于 1，表示数据库中没有此条id
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    //删除文章分类成功
    res.cc('删除文章分类成功')
  })
}
//根据id获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  //定义根据id获取文章分类的SQL语句
  const sql = `select * from ev_article_cate where id=?`
  //调用db.query()
  db.query(sql, req.params.id, (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //SQL语句执行成功，但是没有查询到任何数据，表示数据库中没有这条id值
    if (results.length !== 1) return res.cc('获取文章分类数据失败')
    //把数据响应给客户端
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0]
    })
  })
}
//更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  //定义查询分类名称与分类别名是否被占用的SQL语句
  const sql = `select * from ev_article_cate where id<>? and(name=? or alias=?)`
  //调用db.query()执行查重的操作
  db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    //执行SQL语句失败
    if (err) return res.cc(err)
    //分类名称和分类别名都被占用
    //表示在两条不同的语句中别名和名称被占用
    if (results.length === 2) return res.cc('分类名称与别名分别被占用，请更换后重试！')
    //表示在同一条数据中，有相同的名称和别名
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名同时被占用，请更换后重试！')
    //表示数据库中有一条数据的分类名称与之相同
    if (results.length == 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试')
    //表示数据库中有一条数据的分类别名与之相同
    if (results.length == 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')

    //TODO:更新文章分类
    //定义文章分类的SQL语句
    const sql = `update ev_article_cate set ? where id=?`
    //调用db.query()
    db.query(sql, [req.body, req.body.id], (err, results) => {
      //执行SQL语句失败
      if (err) return res.cc(err)
      //SQL语句执行成功，但影响的行数不等于1,表示当前数据库中没有该id值
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      //更新文章分类成功
      res.cc('更新文章分类成功！', 0)
    })
  })
}
