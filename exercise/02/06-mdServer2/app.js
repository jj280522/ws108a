const Koa = require('koa'); // 引用koa框架
const fs = require('fs')    // 引用File System模組
const MarkdownIt = require('markdown-it') //引用markdown-it套件
const mdit = new MarkdownIt()  //建立一個新的MarkdownIt物件名為mdit

const app = module.exports = new Koa(); //建立一個模組為Koa的物件(module.exports為一特別物件)
const path = require('path'); //引用path模組
const extname = path.extname; //引用extname為檔案副檔名

app.use(async function(ctx) { //app.use為非同步凾式(async function(ctx))
  const fpath = path.join(__dirname, ctx.path); // 獲得當前的絕對路徑+ctx的路徑
  const fstat = await fs.promises.stat(fpath); //獲取檔案統計資訊
  console.log('fpath=', fpath) //紀錄檔案路徑
  if (fstat.isFile()) {  //如果狀態在檔案內
    let ext = extname(fpath) //ext為檔案副檔名
    // console.log('ext=', ext)
    if (ext === '.md') {  //如果ext為.md
      let md = await fs.promises.readFile(fpath, 'utf8') //讀取檔案路徑
      let html = mdRender(md) //html為md渲染
      ctx.type = '.html'  //ctx類型為.html
      ctx.body = html     //ctx內容為html
    } else {
      ctx.type = ext      //ctx類型為ext
      ctx.body = fs.createReadStream(fpath) //檔案讀取ctx內容
    }
  }
})

if (!module.parent) {   //如果不是被引用
  app.listen(3000)      //聽3000埠
  console.log('server run at http://localhost:3000/') //紀錄 執行
}

function mdRender(md) {  //加上完整html框架跟css

  return `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="theme.css"> 
</head>
<body>
  ${mdit.render(md)} 
</body>
</html>
  `
}
