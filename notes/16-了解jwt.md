
- 官网介绍：[jwt](https://jwt.io/introduction)
- 测试举例：[jwt-test](https://jwt.io/#debugger)

测试 jwt： 使用 jsonwebtoken 专门生成 token

使用：

- 安装：`npm i jsonweb token`
- 使用：
  - 生成 jwttoken `jwt.sign(保存的信息, 口令， 参数)`
    - 保存的信息
    - 口令：加密口令，加密的时候混入信息使用，解密的时候还要这个口令
    - 参数：是一个对象 + expiresIn 过期时间，单位为秒 ('1d')
  - 解码：`jwt.verify(你要解析的token, 口令)`
    - token：必须是一个指定的 token 
    - 口令：必须是加密时候用的口令








```js
// 1.准备
const userInfo = {
  _id: '2021-01-23',
  name: 'test',
  value: 'haha'
}

// 2.导入

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

// info:  {
//   _id: '2021-01-22',
//   name: 'hello',
//   others: 'test',
//   iat: 1611390909, 设置 token 的时间
//   exp: 1611390919  过期时间
// }

```


请求设置 token

- 前端页面

```html
<body>
  <h1>登录页</h1>

  <br>
  <button>click me</button>

  <br>

  <a href="./userInfo.html">跳转 userInfo </a>

  <script>
    const btn = document.querySelector('button')
    btn.onclick = function() {
      const url = 'http://localhost:8081/login'
      window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'tst',
          age: 18
        }),
        // mode: 'cors'
      }).then(res => res.json()).then(res => {
        console.log(res)
        window.sessionStorage.setItem('token', res.token)
      })
    }
</script>
```

后端代码：

```js
// 了解 jwt 技术

const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'Osmond')
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
  jwt.verify(token, 'Osmond', (err, data) => {
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
    res.send({
      message: 'success',
      code: 200,
      data: {
        name: 'Osmond',
        age: 18
      }
    })
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
```


跳转页面后 请求新 token

新建 `userInfo.html` 代码为：

```html
<body>
  <h1>UserInfo 页面</h1>
  <button>click me</button>

  <script>
    const btn = document.querySelector('button')
    btn.onclick = function() {
      const token = window.sessionStorage.getItem('token')
      const url = `http://localhost:8081/userInfo`
      window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        // mode: 'cors'
      }).then(res => res.json()).then(res => {
        console.log(res)
      })
    }
</script>
```




## 验证 token 的中间件

文件夹看 `12, index-12.js` ，js 代码为


```js
// 自制 token 中间件

const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

// token 验证
const authMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers
  jwt.verify(token, 'secret', (err, data) => {
    // token 非法或者过期
    if (err || !data) {
      res.send({
        code: 401,
        msg: err.message,
        data: {}
      })
      // 这里要及时返回，否则还是会走到后面，会报错
      return
    }
    // 验证通过
    next()
  })
}

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

router.get('/userInfo', authMiddleware, (req, res) => {
  res.send({
    code: 200,
    msg: '',
    data: {
      username: 'Osmond',
      age: 18
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


```



## 使用第三方 token 校验

查看 文件 `index-13.js` 代码

- `express-jwt` 是一个 express 和 jwt 结合的第三方中间件
- 需要结合 错误中间件一起使用，因为 token 验证失败，它会抛给 错误中间件
- 同时注意，服务端设置 token的时候，需要加一个 `Bearer `，这是一种固定的格式，若没有这个会报错
- 使用方法


```js

// 使用第三方中间件


const express = require('express')
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// 使用 expres-jwt 中间件：填入秘钥，排除不需要验证 token 的路由
const oauthValidateMiddleware = expressJwt({ 
  // 秘钥
  secret: 'secret',
  // 加密方式
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/dont-need-token', '/home', '/other']
})


const errCatchMiddleware = (err, req, res, next) => {
  if (err) {
    console.log("错误处理中间件");
    console.log('err', err)
    console.log('==================')
    res.status(err.status).send(err.code)
  }
  next()
}


router.post('/login', (req, res) => {
  const { username, age } = req.body
  const userInfo = { username, age }
  const token = jwt.sign(userInfo, 'secret', { expiresIn: '30s'})
  res.send({
    messag: 'success',
    code: 0,
    token: 'Bearer '+token // 这里需要
  })
})

router.get('/userInfo', (req, res) => {
  res.send({
    code: 200,
    msg: '',
    data: {
      username: 'Osmond',
      age: 18
    }
  })
})


app.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式是否启用
  limit:    2*1024*1024           //限制-2M  post数据大小
}))
app.use(cors())
app.use(oauthValidateMiddleware)
app.use(router)
app.use(errCatchMiddleware)




app.listen(8081, () => {
  console.log('listen at port 8081')
})

```






**参考资料：**

- [JWT优缺点和适合场景](https://zhuanlan.zhihu.com/p/263410154)
- [深入了解jwt方案的优缺点](https://www.cnblogs.com/nangec/p/12687258.html)
- [为什么不推荐用JWT保护你的Web应用](https://www.jianshu.com/p/792f71bb52dd)
- [jwt 和传统的 session、cookie 的争议](https://www.v2ex.com/t/679220)
- [jwt作为取代session-cookie机制的替代，实际运用会存在什么问题?](https://www.zhihu.com/question/41248303)