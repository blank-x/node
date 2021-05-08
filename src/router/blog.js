const Router = require('koa-router')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')
var router = new Router()
const blog = require('../controllers/blog')

router.prefix('/blog')

router.get('/',blog.getList)

module.exports = router
