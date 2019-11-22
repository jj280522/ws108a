const serve = require('koa-static'); //koa靜態服務
const Koa = require('koa'); //引用koa框架
const app = new Koa();  //建立Koa物件

app.use(serve(__dirname + '/public')); //設置靜態檔案服務 (__dirname為node.js關鍵詞)表實體目錄

app.listen(3000); //聽3000埠

console.log('listening on port 3000'); //紀錄聽3000埠