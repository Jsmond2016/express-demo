/**
 * 配置后端路由
 */

const express = require('express')

const app = express()

// ----------------------
// 拿到一张空的 路由表，以下代码 可以抽离到 ./router.js 文件中
const router = express.Router()

router.get('/test', (req, res) => {

  res.end('get - method')

})

router.post('/test', (req, res) => {

  res.end('post - method')

})

router.delete('/test', (req, res) => {

  res.end('delete - method1')

})
// ------------------------

// use ，告诉 app 对象
app.use(router)

app.listen(8080, () => console.log('server start at 8080'))