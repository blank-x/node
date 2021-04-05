const Router = require('koa-router')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')
var router = new Router()
const paymentControllers = require('../controllers/product')
const {ProductModel} = require('../mongodb/db.js')

router.prefix('/product')
router.get('/all',paymentControllers.all)
module.exports = router
