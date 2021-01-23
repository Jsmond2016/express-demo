// 了解 jwt 技术

const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const userInfo = {
  _id: '2021-01-22',
  name: 'hello',
  others: 'test'
}

const jwt = require('jsonwebtoken')

const token = jwt.sign(userInfo, 'Osmond', { expiresIn: 10 })
console.log(token)

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMDIxLTAxLTIyIiwibmFtZSI6ImhlbGxvIiwib3RoZXJzIjoidGVzdCIsImlhdCI6MTYxMTM5MDQ5NywiZXhwIjoxNjExMzkwNTA3fQ.fVo8a_PFPLTcNOXvs3ILbElvTKi0Xk8jO8z0btR_nLw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// eyJfaWQiOiIyMDIxLTAxLTIyIiwibmFtZSI6ImhlbGxvIiwib3RoZXJzIjoidGVzdCIsImlhdCI6MTYxMTM5MDQ5NywiZXhwIjoxNjExMzkwNTA3fQ
// fVo8a_PFPLTcNOXvs3ILbElvTKi0Xk8jO8z0btR_nLw

setTimeout(() => {
  const info = jwt.verify(token, "Osmond")
  console.log('info: ', info);
}, 3000);


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

router.get('/userInfo', (req, res) => {
  const { authorization: token } = req.headers
  if (!token) {
    res.send({
      message: 'error',
      code: 401,
      data: {}
    })
  }
  jwt.verify(token, 'secret', (err, data) => {
    if (err && err.message === 'Invalid token') {
      res.send({
        message: 'token 非法',
        code: 401,
        data: {}
      })
    }
    if (err && err.message === 'jwt expired') {
      res.send({
        message: 'token 过期',
        code: 401,
        data: {}
      })
    }
    console.log(data)
    if (data) {
      res.send({
        message: 'success',
        code: 200,
        data: {
          name: 'Osmond',
          age: 18
        }
      })
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