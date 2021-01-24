/**
 * 配置后端路由-路由表分类
 */

const express = require('express')
const app = express()

const userRouter = require('./04/userRouter')
const goodRouter = require('./04/goodsRouter')

// 按照业务逻辑分类 /user ,  /good
app.use('/user', userRouter)
app.use('/good', goodRouter)

app.listen(8080, () => console.log('server start at 8080'))