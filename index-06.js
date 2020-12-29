

/** 
 * 接受参数处理
 * 
 * req.query
 * 
 * req.body 需要使用插件 body-parser 才可以拿到
 * 
 * 当前 express 自带 body-parser，使用 express.urlencoded() 即可
 * 
 * 但是 express 官方说未来可能不会继续支持 body-parser，因此可能需要自己安装 body-parser
 * 
 * 但是当前可以继续用
 * 
 */

 const express =  require('express')
 const router = express.Router()
 const app = express()

 

//  通过 req.url 可以 拿到完整的访问路径
//  通过 req.query 可以拿到完整 处理好的参数
 router.get('/query', (req, res) => {
  console.log(req.url);
  
  // /query?a=1&b=2

  console.log(req.query);
  // { a: '1', b: '2' }
 })

 router.post('/post', (req, res) => {
   console.log(req.body);
 })

//  直接挂在一个解析请求体的方式，bodyParser，req 里面就有了 body
//  位置放在最前面
 app.use(express.urlencoded())

// 等价于 下面的代码，加入 {extended: 'false'} 参数表示不是 类实例
// 详情参考：https://github.com/expressjs/body-parser#readme
// const bodyParser = require('body-parser)
// 解析 表单格式 application/x-www-form-urlencoded
// app.use(bodyParser({extended: 'false'}))
// 解析 json 格式
// app.use(bodyParser.json())

 app.use(router)

 app.listen(8080, () => {
   console.log('listening at port 808')
 })