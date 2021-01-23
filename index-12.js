// 自制 token 中间件

const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

// token 验证
const authMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers
  jwt.verify(token, 'secret', (err, data) => {
    // token 非法或者过期
    if (err || !data) {
      res.send({
        code: 401,
        msg: err.message,
        data: {}
      })
      // 这里要及时返回，否则还是会走到后面，会报错
      return
    }
    // 验证通过
    next()
  })
}

router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'secret')
  res.send({
    messag: 'success',
    code: 0,
    token
  })
})

router.get('/userInfo', authMiddleware, (req, res) => {
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
app.use(router)




app.listen(8081, () => {
  console.log('listen at port 8081')
})