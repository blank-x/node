const Router = require('koa-router')
const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')
const getUploadFile = (filename)=>{
  return path.resolve(__dirname,'../uploadfiles')+'/'+filename
}
var router = new Router()

router.get('/testAjax',async function(ctx,next){
  await new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve()
    },2000)
  })
  ctx.body = 'xxx'

})
router.get('/testAjaxJson',async function(ctx,next){

  ctx.body = {
    a:12
  }

})

router.get('/testAjaxProgress',async function(ctx,next){

  await new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve()
    },1000)
  })
  ctx.body = fs.readFileSync(getUploadFile('a.apk'))
  // ctx.set('Content-Length', '10000')

})
router.post('/testAjaxBuffer',async function(ctx,next){
  await new Promise((resolve, reject)=>{
    var body = []
    ctx.req.on('data', (data)=>{
      body = [...body,...data]
    })
    ctx.req.on('end', ()=>{
      console.log(body);
      resolve()
    })
  })
  ctx.body = 'yes'

})

router.post('/testAjaxFile',async function(ctx,next){

  await new Promise((resolve, reject)=>{
    var body = []
    var size = 0
    ctx.req.on('data', (chunk)=>{
      body.push(chunk)
      size+= chunk.length
    })
    ctx.req.on('end', ()=>{
      var buf = Buffer.concat(body,size)
      console.log(getUploadFile('xxx.png'));
      fs.writeFileSync(getUploadFile('xxx.png'),buf)
      resolve()
    })
  })
  ctx.body = 'yes'


})
router.get('/testAjaxEncode',async function(ctx,next){
  ctx.body = ctx.request.query.f
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
