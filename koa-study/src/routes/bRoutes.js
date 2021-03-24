// const Router = require('koa-router')
import Router from 'koa-router'

// const b = require('../api/b')

import b from '../api/b'

const router = new Router()

router.get('/b', b)

export default router