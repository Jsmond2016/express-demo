const Koa = require('koa') 
const Router = require('koa-router')
const combineRouters = require('koa-combine-routers')

const app = new Koa()
 
const dogRouter = new Router()
const catRouter = new Router()
 
dogRouter.get('/dogs', async ctx => {
  ctx.body = 'dogs  ok'
})
 
catRouter.get('/cats', async ctx => {
  ctx.body = 'cats  ok'
})
 
const router = combineRouters(
  dogRouter,
  catRouter
)

app.use(router())

app.listen(3000, () => {
  console.log('服务已开启，运行在' + process.env.PORT + '端口')
})