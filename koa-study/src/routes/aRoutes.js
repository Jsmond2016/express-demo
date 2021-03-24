// const Router = require('koa-router')
import Router from 'koa-router'

// const a = require('../api/a')

import a from '../api/a'


const router = new Router()

router.get('/a', a)

// module.exports = router
export default router
