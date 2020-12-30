  /**
   * cookie-parser: https://github.com/expressjs/cookie-parser
  *  设置 cookie
  *  读取 cookie  req.cookies
  *  设置 cookie  res.cookie(key, value, options) 
  */
 const express = require('express')
 const cookieParser = require('cookie-parser')
 const cors = require('cors')
 const app = express()
 const fs = require('fs')
 const router = express.Router()

 router.get('/index', (req, res) => {
   // 浏览器手动写入 cookie，在 req.cookies 就可以拿到  
   console.log('req.cookie', req.cookies);

   fs.readFile('./views/index.html', 'utf8', (err, data) => {
     if (err) return
    //  设置 cookie，req.cookie(key, value, options )
    //  res.cookie('test', 300)
    // 设置 cookie，过期时间为 10 秒
     res.cookie('avatar_name', 'test', { maxAge: 1000 * 10})
     res.send(data)
   })
 })
 
 app.use(cors())
 app.use(cookieParser())
 app.use(router)

 app.listen(8080, () => {
   console.log('listen at port 8080');
 })
