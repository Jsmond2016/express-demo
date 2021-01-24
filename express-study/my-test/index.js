/*
 * @Description: 测试 cookie-parser，配合 test.http  使用
 * @Date: 2021-01-23 22:11:13
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */


const express = require('express')
const app = express()
// 引入
const cookieParser = require('cookie-parser')


const router = express.Router()

router.get('/test', (req, res) => {
  console.log('req.cookies', req.cookies)
  res.send({
    ...req.cookies
  })
})

router.post('/post', (req, res) => {
  res.cookie('test', 'post', {maxAge: 1000 * 10, signed: true })
  res.send({
    code: 0,
    msg: ''
  })
})

// 使用-注意挂载顺序要在路由前
app.use(cookieParser("secret"))

app.use(router)

app.listen(8080, () => {
    console.log('listen at 8080')
})