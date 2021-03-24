// 使用方式：compose([a, b, c, ...])

const Koa = require('koa')
const componse = require('koa-compose')

const app = new Koa()

const middle1 = (ctx, next) => {
  console.log('11111')
  next()
}

const middle2 = (ctx, next) => {
  console.log('222')
  next()
}

const middle3 = (ctx, next) => {
  console.log('333')
  ctx.body = 'hahahahah'
  next()
}

// 合并的中间件要放在 数组中
app.use(componse([middle1,middle2,middle3]))

app.listen(3000, () => {
  console.log('start server port at 3000')
})