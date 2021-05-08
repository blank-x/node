var Router = require('koa-router')
var router = new Router()
var payment = require('./payment')
var student = require('./student')
var info = require('./student')
var product = require('./product')
var blog = require('./blog')


module.exports = function (app) {
  router.prefix('/n')
  router.use(payment.routes())
  router.use(student.routes())
  router.use(product.routes())
  router.use(blog.routes())

  app.use(router.routes())
  app.use(router.allowedMethods())
}
