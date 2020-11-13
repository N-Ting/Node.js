// 引入path模块
const path = require('path')
// 引入fs模块
const fs = require('fs')
// 定义正则表达式分布匹配<style></style>和<script></script>
const regCSS = /<style>[\s\S]*<\/style>/
const regJS = /<script>[\s\S]*<\/script>/
// 读取文件
fs.readFile(path.join(__dirname, '/素材/index.html'), 'utf8', function (err, dataStr) {
  if (err) return console.log('读取文件失败！' + err.message);
  // 调用处理css样式的函数
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})
// 处理css样式函数
function resolveCSS (htmlStr) {
  // 使用正则提取内容
  const r1 = regCSS.exec(htmlStr)
  // console.log(r1[0]);
  // 将数组里面的<style></style>替换成空的字符串
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  // 将替换成功的数据写入文件
  fs.writeFile(path.join(__dirname, '/clock/index.css'), newCSS, err => {
    if (err) return console.log('写入CSS样式失败！', +err.message)
    console.log('写入CSS样式成功!');
  })


}

// 处理js函数
function resolveJS (htmlStr) {
  // 使用正则提取内容
  const r2 = regJS.exec(htmlStr)
  // console.log(r1[0]);
  // 将数组里面的<style></style>替换成空的字符串
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  // 将替换成功的数据写入文件
  fs.writeFile(path.join(__dirname, '/clock/index.js'), newJS, err => {
    if (err) return console.log('写入js文件失败！', +err.message)
    console.log('写入js文件成功!');
  })
}
// 处理html的方法
function resolveHTML (htmlStr) {
  // 将<style></style>替换为link，<script></script>替换为script链接
  const newStr = htmlStr.replace(regCSS, '<link rel="stylesheet" href="./index.css/">').replace(regJS, '<script src="./clock/index.js"></script>')

  // 写入文件
  fs.writeFile(path.join(__dirname, './clock/index.html'), newStr, err => {
    if (err) return console.log('写入html文件失败！' + err.message);
    console.log('写入html文件成功');
  })
}