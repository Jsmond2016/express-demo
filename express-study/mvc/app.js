/*
 * @Description: 
 * @Date: 2021-01-18 23:12:34
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 const express = require('express')
 
 const app = express()

 const router = require('./router/router.js')

 app.use(router)


 app.listen(8080, () => {
   console.log('listen at port 8080')
 })
