var Router = require('koa-router')
var router = new Router()
var payment = require('./payment')
var student = require('./student')
var info = require('./student')
var product = require('./product')



module.exports = function (app) {
  router.prefix('/n')
  router.use(payment.routes())
  router.use(student.routes())
  router.use(product.routes())

  app.use(router.routes())
  app.use(router.allowedMethods())
}
