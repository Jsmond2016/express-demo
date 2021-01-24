/**
 * 配置后端路由-路由表分类
 */

const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {

  res.end('get - goods-test')

})

router.post('/test', (req, res) => {

  res.end('post - goods-test')

})

router.delete('/test', (req, res) => {

  res.end('delete - goods-test')

})


module.exports = router