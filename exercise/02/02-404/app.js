const Koa = require('koa'); // 引用koa框架

const app = module.exports = new Koa(); //建立一個模組為Koa的物件(module.exports為一特別物件)

app.use(async function pageNotFound(ctx) { //app.use為非同步凾式(async functionpageNotFound(ctx))
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404  //回傳404
});

if (!module.parent) app.listen(3000); //如果不是被引用時，聽3000埠
