/*
 * @Description: 
 * @Date: 2021-01-18 23:12:38
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

 const router = require('express').Router()

 const handleA = require('../middleware/handleA')
  
 const getUsers = require('../model/users')


 router.get('/get-users', handleA, getUsers)
 

 module.exports = router