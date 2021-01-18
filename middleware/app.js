/*
 * 中间件：
   - 在2个事情中间，给你断开，加一个内容
   - 加入的这个内容，可以做一些事情，可以子继续选择走下一条路，next
   - 根据加入的位置不同，叫做不同的中间件
   1. 全局中间件：(req, res, next) => {}
       - 所有请求都要经历，直接挂在在 app 上
       - app.use(Fn)
   2. 路由级中间件：
       - 在进入路由表，到匹配到对应请求标识符添加的
       - 支队当前这个路由表生效
       - router.use(Fn)
   3. 路由应用级中间件
       - 书写在路由表中
       - 在匹配到指定路径标识符以后，时间处理函数事件
       - 只对匹配到的路由标识符生效
       - router.get('path', 中间件函数Fn1， 路由处理函数Fn2)
   4. 全局错误处理中间件
       - 一般书写在 服务的最后
       - 一般用来返回最终结果
       - 一般接收 4个参数：(err, req, res, next) => {}
         - 当前面有任意一个中间件报错了，next 
         - app.use((err, req, res, next) => {}) 
 *
 *
 * @Description: 中间件学习
 * @Date: 2021-01-12 22:09:34
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 const express = require('express')
 const cookieParser = require('cookie-parser')
 const bodyParser = require('body-parser')

 const router = express.Router()

 const app = express()

 app.use(cookieParser())
 app.use(bodyParser({extended: 'false'}))


 router.get('/a', (req, res, next) => {
   console.log('/a')
   next()
 })
 router.post('/a', (req, res, next) => {
  console.log('/a')
  next()
})

app.use(router)

 app.listen(8080, () => {
   console.log('listen at 8080')
 })