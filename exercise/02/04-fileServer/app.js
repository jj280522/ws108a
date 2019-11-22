const Koa = require('koa'); // 引用koa框架
const fs = require('fs') // 引用File System模組
const app = module.exports = new Koa(); //建立一個模組為Koa的物件(module.exports為一特別物件)
const path = require('path'); //引用path模組
const extname = path.extname; //引用extname為檔案副檔名

app.use(async function(ctx) { //app.use為非同步凾式(async function(ctx))
  const fpath = path.join(__dirname, ctx.path); // 獲得當前的絕對路徑+ctx的路徑
  const fstat = await fs.promises.stat(fpath); //獲取檔案統計資訊

  if (fstat.isFile()) {
    ctx.type = extname(fpath); //ctx類型為檔案副檔名
    ctx.body = fs.createReadStream(fpath); //讀取檔案
  }
});

if (!module.parent) app.listen(3000); //如果不是被引用時，聽3000埠
