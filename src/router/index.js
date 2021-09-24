var Router = require('koa-router')
var router = new Router()
var test = require('./a')







module.exports = function (app) {
  router.prefix('/n')
  router.use(test.routes())
  app.use(router.routes())
  app.use(router.allowedMethods())
}
