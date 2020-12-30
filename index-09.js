  /**
   * express-session: https://www.npmjs.com/package/express-session
   *  安装  yarn add express-session -D
   *  
   * 
   * 
   * 使用： 
   *  const expressSession = require('express-session')
   *  app.use(expressSession({ config }))
   *  
   *  config 参数：
   *    --> secret: 加密口令
   *    --> saveUninitialized: true | false，未初始化的时候是否需要存储内容，默认是 true
   *    --> resave: 重新存储，一般设置成true，表示每次 session 修改后都会重新存储，避免 sessionId 被盗用
   *    --> name: 设置 cookie  的  name
   *    --> cookie: 设置 cookie 的相关属性。如过期时间 cookie: { maxAge: 1000 * 60 * 60 * 24 } 表示有效期 1 天
   * 
   *  注意： express-session 会自动操作 cookie
   *  会在 req 新增一个属性 req.session，是一个对象空间，可以往里面添加一些成员内容
   *  当你第一次存储内容进去的时候，就已经将内容存进去了
   *   --> express-session 会自动生成一个 session_id 
   *   --> 自动把 这个 id 分成 2 半，一半放在 cookie 里，一半放在服务器内存里 
   *  
   * session 的缺点：
   *   1. 属于服务器的一半 id 存储在内存中，服务器重启后，sessin_id 就无效了 --> 解决：持久化存储：存到数据库
   *      存储到 数据库，需要配置 config.store， 依赖一个第三方插件 connect-mongo
   *    操作方式：
   *      --> 1-1.yarn add connect-mongo -D
   *      --> 1-2 关联 session：
   *          --> const connectMongo = require('connect-mongo)
   *          --> const MongoStore = connectMongo(session)
   *      --> 1-3 在配置 session 的 config 的时候使用
   *              { store: new MongoStore({
            *                url: 'mongodb://localhost:27017/session',
            *                touchAfter: 1000 * 10, 
            *                 // 自动延长过期时间：表示这个时间内，如果你重新登陆了，它会自动将 过期时间帮你顺延
            *                 // 不推荐设置：如果要设置最多设置 1 天，否则对服务器压力大
            *               })
   *              }
   *              会存储到 mongodb 数据库中，过期后，会自动删除改条 session
   * 
   * 
   */
 const express = require('express')
 const cookieParser = require('cookie-parser')
 const expressSession = require('express-session')
 const connctMongo = require('connect-mongo')
 const cors = require('cors')
 const app = express()
 const fs = require('fs')
 const router = express.Router()

 //  关联 session
 const MongoStore = connctMongo(expressSession)

//  这里读取和判断 session name
 router.get('/index', (req, res) => {

   fs.readFile('./09/index.html', 'utf8', (err, data) => {
     if (err) return
     //  访问 session 空间
     //  里面如果有这个信息，表示已登录状态，继而显示正确的页面
     //  如果没有之前存储的信息，表示未登录， 或者一半的 sessioId 是假的
     //  结果就直接跳转回登录页

     //  判断 session.nickName 是否为 undefined ? 未登录-> 跳转登录页 : 已登录-> 显示当前页  
     console.log('req.session', req.session);
     // 判断是否为登陆，若不是登录页，冲洗登陆  
     if (!req.session.nickName) return res.redirect('/login')
     res.send(data)
   })
 })

 //   这里设置 session name
 router.get('/login', (req, res) => {

   fs.readFile('./09/login.html', 'utf8', (err, data) => {
     if (err) return
     //  打开页面就默认登陆成功
     //  默认登陆成功
     //  在 session 孔家那里面存储一个数据，表示我登陆成功了
     //  如果你需要存储，方法为 req.session.your_name = your_value
     req.session.nickName = 'test'
     res.send(data)
   })
 })
 
 app.use(cors())
 app.use(cookieParser())
 app.use(expressSession({
  secret: 'test-session',
  name: 'not_a_seession_id',
  saveUninitialized: false,
  resave: true,
  cookie: {
    // 30秒后失效，避免 重新打开 浏览器 登录态失效
    maxAge: 1000 * 30
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/gp19',
    touchAfter: false
  })
 }))
 app.use(router)

 app.listen(8080, () => {
   console.log('listen at port 8080');
 })
