/**
 * 了解 express
 */

const express = require('express')

const app = express()

app.get('/get', (req, res) => {
  // res.end('hello, world')
  // res.send('hello, world')
  
  // 报错，因为 end 方法 只接受字符串 
  // res.end({hello: 'name'})

  // 结果会被 JSON.Stringify()
  res.send({hello: 'name'})
})

app.listen(8080, () => console.log('server start at 8080'))