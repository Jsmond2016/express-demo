const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

// 用于格式化返回的 数据为 json 格式
const json = require('koa-json')



const app = new Koa()
const router = new Router()


// 常规测试
router.get('/', ctx => {
  console.log(ctx)
  ctx.body = 'hello, world'
})

router.get('/api', ctx => {
  console.log(ctx)
  ctx.body = 'hello, Api'
})

router.get('/async', async (ctx)=> {
  let res = await new Promise((resove, reject) => {
    setTimeout(() => {
      resove("Hello, world 2s later");
    }, 2000)
  })
  ctx.body = res
})


router.post('/post', async (ctx) => {
  let { body } = ctx.request
  console.log(body)
  console.log(ctx.request)
  ctx.body = body
})


// prefix 测试



app.use(koaBody())
   .use(cors())
   .use(json({
     pretty: false, param: 'pretty'
   }))
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(3000)