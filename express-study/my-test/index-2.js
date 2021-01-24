const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const app = express()
const router = express.Router()

/** session 配置信息 */
const sessonConfig = {
  secret: 'test-session', // 加密口令
  name: 'seession_id', // 设置 cookie  的  name
  saveUninitialized: true, // 未初始化的时候是否需要存储内容，默认是 true
  resave: true, // 重新存储，一般设置成true，表示每次 session 修改后都会重新存储，避免 sessionId 被盗用
  cookie: {  // 设置 cookie 的相关属性。如过期时间 cookie: { maxAge: 1000 * 60 * 60 * 24 } 表示有效期 1 天
    maxAge: 1000 * 30 // 30秒后失效，避免 重新打开 浏览器 登录态失效
  },
}


router.post('/set-session', (req, res) => {
    const { name } = req.body
    req.session.name = name
    console.log(req.session);
    res.end("ok")
})



app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession(sessonConfig))
app.use(router)

app.listen(8080, () => {
    console.log('listen at port 8080');
})