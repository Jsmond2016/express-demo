const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

const staticPath = './static'

//即可直接通过 http://localhost:3000/pear.jpg 访问到静态资源
app.use(static(
  path.join(__dirname, staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = '<h1>hello world</h1>'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})