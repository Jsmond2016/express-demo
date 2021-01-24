/*
 * @Description: 单个文件上传-简单版本
 * @Date: 2020-12-29 20:44:03
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 * 
 * 学习视频：https://www.bilibili.com/video/BV1xa4y1p7uu?p=8
 * 
 * 具体参考文件：/07/index.html， 使用 hs 启动
 * 
 *  文件上传--单文件上传版本
 * 
 *  1-解决跨域问题
 *  2-接受文件
 *    -> 2-1 准备一个文件夹放在服务器上，用于存储文件
 *    -> 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 *    -> 2-3 使用 multer 配置一个接收器 ==> multer({ dest: '存放文件的路径' })
 *    -> 2-4 使用 multer 接受文件
 *       --> 哪一个路由需要接受文件，就配置在哪一个路由上
 *       --> 写在路由标识符的后面，路由处理函数的前面
 *       --> 接收器.single('前端上传文件的key')
 *   -> 2-5 在路由处理函数里面
 *      --> 会在 req 上面多一个信息叫 file
 *      --> 就是你上传的文件的信息
 *   注意：会把文件存储起来，随机命名，但是没有后缀
 * 
 */

 const express = require('express')
 const router = express.Router()
 const cors = require('cors')

 // 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 const multer = require('multer')
 const app = express()

 // 2-3 使用 multer 配置一个接收器
 const fileUpload = multer({ dest: './uploads/'})

 //  允许跨域
 app.use(cors())

//  单文件上传，fileUpload.single(name) 这里的 name 是你上传文件 form 里面的 name
 router.post('/upload', fileUpload.single('file'), (req, res) => {
   console.log('req.file', req.file);
   console.log('received upload');
   res.send(req.file.originalname)
 })

 
 app.use(router)

 app.listen(8888, () => {
   console.log('start at port 8888');
 })