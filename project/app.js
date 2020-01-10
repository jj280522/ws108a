const M = require('./model')
const logger = require('koa-logger')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaJson = require('koa-json')
const koaStatic = require('koa-static')
const Koa = require('koa')
const session = require('koa-session')

const app = module.exports = new Koa()
const router = new KoaRouter()




// middleware

app.use(logger())
app.use(koaBody())
app.use(koaStatic('./public'))

// route definitions

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app))
app.use(router.routes())
app.use(koaJson())

/**
 * Post listing.
 */
router
.get('/',async(ctx)=>{
  ctx.redirect('login.html')
})

async function register(ctx){
  const userData = ctx.request.body // userdata
  console.log("register:",userData)

  if (await M.get(userData.id) == null){ // 確認帳號是否重複 **await 確保 M.get()讀取完資料
      console.log("userdata:",M.get(userData.id))
      await M.add(userData)
      console.log("sign up success!")
      ctx.redirect('/')
  }
  else {
      ctx.session.error_r = "帳號已被使用"
      ctx.redirect('/register')
  }
}  

async function login(ctx){
  let {id, password} = ctx.request.body
  console.log("login()_msg:",id,password)

  let find_login =  await M.get(id)

  if (find_login != null){ // 確認使用者資料是否存在

      if (find_login.password == password){ // 確認密碼
          ctx.session.userID = id
          ctx.session.error = undefined
          console.log('login success')
          ctx.redirect('/')
      }

      else {
          ctx.session.error = "密碼錯誤"
          ctx.redirect('/login')
      }
  }
  else {
      ctx.session.error = "用戶不存在"
      ctx.redirect('/login')
  }
}

async function logout(ctx){
  console.log("logout test")
  ctx.session.userID = undefined // 清除 session 紀錄的登入資料
  ctx.redirect('/')
}

async function main() {
  await M.open()
  app.listen(3000)
  console.log("server run at http://localhost:3000/")
}

main()