const Router = require('koa-router')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')
var router = new Router()
const paymentControllers = require('../controllers/payment')
const {ProductModel} = require('../mongodb/db.js')

router.prefix('/payment')

router.get('/',paymentControllers.index)

router.get('/home',paymentControllers.home)

// post body数据在ctx.request.body上
router.post('/submit',paymentControllers.submit)

router.get('/testAjax',async function(ctx,next){
  await new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve()
    },3000)
  })
  ctx.body = 'testAjax'

  // setTimeout(function(){
  //     ctx.body = 'testAjax'
  // },3000)
})
router.post('/testAjax',async function(ctx,next){
  await new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve()
    },3000)
  })
  ctx.body = 'testAjax'
})

router.get('/testAjaxError',async function(ctx,next){
  await new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve()
    },3000)
  })
  ctx.status = 500
  ctx.body = 'testAjax'
})

router.get('/weiboHot',async function(ctx,next){
  const file = path.resolve(__dirname,'../hotSearch.json')
  const res =  await fsPromises.readFile(file)
  await ctx.render('weibohot', {
    list:JSON.parse(res.toString())
  })
})

router.post('/errlog',function(ctx,next){

  ctx.body = ctx.request.body
})


module.exports = router
