const Koa = require('koa');  //引用koa框架
const app = module.exports = new Koa();   //建立一個模組為Koa的物件(module.exports為一特別物件)

app.use(async function(ctx) {   //app.use為非同步凾式(async function(ctx))
  console.log('url=', ctx.url)  //紀錄網址為(ctx.url)
  ctx.body = 'Hello World';  //加入網頁內容在ctx.body內
});

if (!module.parent) app.listen(3000);  //如果不是被引用時，聽3000埠
