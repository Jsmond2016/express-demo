/**
 * 配置后端路由-静态资源
 */

const express = require('express')
const app = express()
const fs = require('fs')

const router = express.Router()
router.get('/index', (_, res) => {
  fs.readFile('./views/index.html', 'utf8', (err, data) => {
    if (err) return
    res.send(data)
  })
})


// 预览地址：http://localhost:8080/index/index

// 01-先配置静态资源 目录，通常会配置 2种类型，
// 一种是本地资源 如 css，js，图片等
// 另一种是 第三方资源
// 直接访问：http://localhost:8080/public/1.css
app.use('/public', express.static('./public'))
// 配置第三方资源，在 index.html 中使用
app.use('/node_modules', express.static('./node_modules'))
// 02-在 html 中引入静态资源，才可以引入
app.use('/index', router)

app.listen(8080, () => console.log('server start at 8080'))