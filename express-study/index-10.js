const express = require('express')
const expressArtTpl = require('express-art-template')

const app = express()

const router = express.Router()



router.get('/login', (req, res) => {
  res.render('login.html', { status: '请登录'})
})

router.get('/index', (req, res) => {
  res.render('index.html', { status: '已登录', name: '黄同学'})
})

// 配置模板类型
app.engine('html', expressArtTpl);
// 配置模板 所在目录
app.set('views', __dirname + '/10');
app.use(router)


app.listen(8080, () => {
  console.log('server start at port 8080');
})