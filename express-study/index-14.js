const express = require('express')
const router = express.Router()
const app = express()

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const redis = require('redis')
const redisClient = redis.createClient()

// cmd 中验证 redis 是否启动，输入命令：redis-cli && PING, 具体操作 https://www.runoob.com/redis/redis-commands.html
redisClient.on('ready',function(res){
  console.log('ready');
});

redisClient.on('end',function(err){
  console.log('end');
});

redisClient.on('error', function (err) {
  console.log(err);
});

redisClient.on('connect',function(){
  console.log('redis connect success!');
});

router.post('/login', (req, res) => {
  const { name, password } = req.body
  const _id = Date.now().toString().slice(2)
  redisClient.set(name, JSON.stringify({ name, _id }), (err) => {
    console.log('redis-err', err)
  })
  res.send({
    code: 0,
    msg: 'success',
    data: {
      _id,
      name
    }
  })
})

router.get('/get-info', (req, res) => {
  const { name } = req.query
  const _id = redisClient.get(name)
  res.send({
    code: 0,
    msg: 'success',
    data: {
      _id,
      name
    }
  })
})


app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(router)

app.listen(8090, () => {
  console.log('listen at port 8090')
})