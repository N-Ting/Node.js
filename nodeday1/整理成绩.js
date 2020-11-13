//导入fs模块
const fs = require('fs')
//调用fs.readFile()来读取文件
fs.readFile('./素材/成绩.txt', 'utf8', function (err, dataStr) {
  //判断是否读取成功
  if (err) return console.log('读取失败' + err.message);
  // return console.log('读取文件成功' + dataStr);

  // 先把文件进行''分割
  const arrOld = dataStr.split(' ')
  // console.log(arrOld);
  // 定义一个新的空数组
  const arrNew = []
  // 遍历旧数组
  arrOld.forEach(item => {
    // 将就数组中的=替换成：推入到新数组里
    arrNew.push(item.replace('=', ':'))
  })
  // 将数组里面的每一项进行合并，得到一个新的字符串
  const newStr = arrNew.join('\r\n')

  // 调用fs.writeFile()写入文件
  fs.writeFile('./file/2.txt', newStr, function (err) {
    if (err) return console.log('写入文件失败' + err.message);
    return console.log('写入文件成功');
  })
})

