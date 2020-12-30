/*
 * @Description: 多个文件上传---多名字多文件版本
 * @Date: 2020-12-29 20:44:03
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 * 
 * 学习视频：https://www.bilibili.com/video/BV1xa4y1p7uu?p=11
 * 
 * 具体参考文件：/07-02/index.html，使用 hs 启动
 * 
 *  文件上传--单文件上传版本
 * 
 *  1-解决跨域问题
 *  2-接受文件
 *    -> 2-1 准备一个文件夹放在服务器上，用于存储文件
 *    -> 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 *    -> 2-3 生成一个仓库信息
 *      --> multer.diskStorage({ config 配置信息 }),config 如下：
 *         --> destination: function(req, file, callback) {}
 *         --> filename: function(req, file, callback) {}
 *      --> 返回值：是一个仓库信息
 *    -> 2-4 使用 multer 生成一个接收器
 *       --> 接收配置里面的仓库信息
 *       --> 语法： multer({ storage: 仓库信息})
 *    -> 2-5 使用方法发生变更：
 *        --> single 方法专门接收单文件，即一个名称 对应 一个文件
 *        --> array 方法专门接收多文件， 即一个名称 对应 多个文件
 *        --> fields 方法专门接受多文件，多个名称匹配多个文件
 *        --> 同时，在 destination 函数中的 callback，对于多种不同类型的文件，需要放在不同的文件夹内
 *        --> 因此，在后面的方法中，就不能使用 req.file, 或者 file.originname 等方法获取文件信息
 *        --> 而是需要使用  req.files ，数组里面存储着每一个文件的信息
 * 
 *        --> 走到这一步，基本就学会了： 单名字单文件上传，但名字多文件，多名字多文件 上传，下一步，就是将 存储的路径存储到数据库中
 */

 const express = require('express')
 const path = require('path')
 const router = express.Router()
 const cors = require('cors')

 // 2-2 需要插件帮助 multer ，下载 npm i multer，配置， 使用
 const multer = require('multer')
 const app = express()

 // 2-3 使用 multer 生成一个仓库信息
 const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
    // req 本次请求信息
    // file 本次请求的文件
    // cb   回调函数，利用回调函数来设定存储路径
    // cb 的第一个参数，设置成 null ，表示不修改 传入的 二进制流 文件
    // cb(null, './uploads/')
    // 这里对于不同类型的文件放在不同的文件夹
    const suffix = path.extname(file.originalname)
    cb(null, `./uploads/${suffix.slice(1)}`)
   },
   filename: (req, file, cb) => {
     // req 本次请求信息
     // file 本次请求的文件
     // cb   回调函数，利用回调函数来设定存储路径
     // cb 的第一个参数，设置成 null ，表示不修改 传入的 二进制流 文件
     // cb 的第二个参数，是重命名 传入的文件 
    //  cb(null, 'new_name.jpg')
    // 获取后缀名
    const suffix = path.extname(file.originalname)
    // 随机数命名
    cb(null, `new_name_${new Date().getTime()}_${Math.random().toString().slice(2)}${suffix}`)
   }
 })

//  2-4 配置接收器，带有仓库信息
 const storage = multer({ storage: fileStorage })

 //  允许跨域
 app.use(cors())

//  2-5 使用我们配置好的接收器 去接收文件
 router.post('/upload', storage.fields([
   {name: 'avatar'},
   {name: 'photo'}
 ]), (req, res) => {
   console.log('req.files', req.files);
   console.log('received upload');
   res.end('success')
 })

 
 app.use(router)

 app.listen(8888, () => {
   console.log('start at port 8888');
 })