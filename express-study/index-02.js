/**
 * 了解后端路由
 */

const express = require('express')

const app = express()

app.get('/test', (req, res) => {

  res.end('get - method')

})

app.post('/test', (req, res) => {

  res.end('post - method')

})

app.delete('/test', (req, res) => {

  res.end('delete - method1')

})

app.listen(8080, () => console.log('server start at 8080'))