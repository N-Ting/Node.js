// const fs = require('fs')
// fs.readFile('./file/1.txt', 'utf8', function (err, dataStr) {
//   console.log(err);
//   console.log('------------');
//   console.log(dataStr);

// })
// const fs = require('fs')
// fs.writeFile('./file/1.txt', '开心了', function (err) {
//   console.log(err);
//   // console.log('------------');
//   // console.log(dataStr);

// })
const fs = require('fs')
const path = require('path')

fs.writeFile(path.join(__dirname, '/file/1.txt'), '开心了', function (err) {
  if (err) return console.log('写入文件错误' + err.message);
  console.log('写入文件成功');

})

