//导入fs模块
const fs = require('fs')
// 导入path模块
const path = require('path')


// 定义正则表达式，
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 读取文件
fs.readFile(path.join(__dirname, '/素材/index.html'), 'utf8', function (err, dataStr) {
  if (err) return console.log('读取文件失败！' + err.message);
  // 调用css方法
  resolveCSS(dataStr)
  // 调用js方法
  resolveJS(dataStr)
  // 调用html方法
  resolveHTML(dataStr)

})

// 处理css样式的方法
function resolveCSS (htmlStr) {
  // 使用正则exec方法提取内容
  const r1 = regStyle.exec(htmlStr)
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  // 写入文件
  fs.writeFile(path.join(__dirname, '/clock/index1.css'), newCSS, err => {
    if (err) return console.log('写入css样式失败！' + err.message);
    console.log('写入CSS样式成功！');
  })
}

// 处理js的方法
function resolveJS (htmlStr) {
  const r2 = regScript.exec(htmlStr)
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  // 写入js
  fs.writeFile(path.join(__dirname, '/clock/index1.js'), newJS, err => {
    if (err) return console.log('写入js文件失败！' + err.message);
    console.log('写入js文件成功！');
  })
}

function resolveHTML (htmlStr) {
  // 将<style></style>替换成link，将<script></script>替换成script
  const newStr = htmlStr.replace(regStyle, '<link rel="stylesheet" href="/clock/index1.css"/>').replace(regScript, '<script src="/clock/index1.js"></script>')
  fs.writeFile(path.join(__dirname, "/clock/index1.html"), newStr, err => {
    if (err) return console.log('写入html文件失败！' + err.message);
    console.log('写入html文件成功！');
  })
}