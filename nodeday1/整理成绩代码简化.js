// 导入fs模块
const fs = require('fs')
fs.readFile('./素材/成绩.txt', 'utf8', function (err, dataStr) {
  if (err) return console.log('读取文件失败！' + err.message);
  const r1 = dataStr.replace(/=/g, ':').replace(/[\s]/g, '\r\n')
  fs.writeFile('./file/3.txt', r1, err => {
    if (err) return console.log('写入文件失败！' + err.message);
    console.log('写入文件成功！');
  })
})