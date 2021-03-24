const compress = require('koa-compress')
const Koa = require('koa')

// 具体信息，可以参考这篇博客 https://blog.csdn.net/dreamjay1997/article/details/85229277


const app = new Koa()
app.use(compress({
  filter (content_type) {
  	return /text/i.test(content_type)
  },
  threshold: 2048,
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH,
  },
  br: false // disable brotli
}))


// 使用
app.use((ctx, next) => {
  //ctx 代表响应 ctx.compress = trus 代表允许压缩
  ctx.compress = true
  // ...
})

app.listen(3000,()=>{
  console.log('[demo] server is starting at port 3000');
})