/**
 * 配置后端路由-路由表分类
 */

const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {

  res.end('get - users-test')

})

router.post('/test', (req, res) => {

  res.end('post - users-test')

})

router.delete('/test', (req, res) => {

  res.end('delete - users-test')

})

module.exports = router