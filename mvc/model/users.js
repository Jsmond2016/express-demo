/*
 * @Description: 
 * @Date: 2021-01-18 23:18:23
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */


 async function getUsers () {
   const user = await mongodb.find({id: 111})
   return user
 }

 module.exports = getUsers