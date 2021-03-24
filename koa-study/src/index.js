import path from 'path'
import koa from 'koa'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import compose from 'koa-compose'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import compress from 'koa-compress'

import router from './routes/routes'

const app = new koa()

const isDevMode = process.env.NODE_ENV === 'production' ? false : true


/**
 * 使用 koa-compose 中间件
 */
const middleware = compose([
  koaBody(),
  statics(path.join(__dirname,'../static')),
  cors(),
  jsonutil({pretty: false, param: 'pretty'}),
  helmet(),
])

// 如果是生产模式，压缩代码
if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())


app.listen(3000)

// 验证 koa-static 中间件，使用 http://localhost:3000/pear.jpg 访问