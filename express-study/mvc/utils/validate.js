/*
 * @Description: 
 * @Date: 2021-01-18 23:20:32
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

//  这里一般是工具库

function validate(form = {}) {
  return Object.keys(form).length > 0
}

module.exports = validate