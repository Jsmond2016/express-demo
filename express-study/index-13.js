// 使用第三方中间件


const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// 使用 expres-jwt 中间件：填入秘钥，排除不需要验证 token 的路由
const oauthValidateMiddleware = expressJwt({ 
  // 秘钥
  secret: 'secret',
  // 加密方式
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/dont-need-token', '/home', '/other']
})


const errCatchMiddleware = (err, req, res, next) => {
  if (err) {
    console.log("错误处理中间件");
    console.log('err', err)
    console.log('==================')
    res.status(err.status).send(err.code)
  }
  next()
}


router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'secret', { expiresIn: '30s'})
  res.send({
    messag: 'success',
    code: 0,
    token: 'Bearer '+token
  })
})

router.get('/userInfo', (req, res) => {
  res.send({
    code: 200,
    msg: '',
    data: {
      username: 'Osmond',
      age: 18
    }
  })
})


app.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式是否启用
  limit:    2*1024*1024           //限制-2M  post数据大小
}))
app.use(cors())
app.use(oauthValidateMiddleware)
app.use(router)
app.use(errCatchMiddleware)




app.listen(8081, () => {
  console.log('listen at port 8081')
})