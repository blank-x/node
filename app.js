const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const koaBody = require('koa-body');
const fs = require('fs')
const fsPromises = fs.promises;
const views = require('koa-views')

const path = require('path')
const cors = require('@koa/cors');
const {ProductModel} = require('./db.js')
var router = new Router()
router.prefix('/payment')
require('./weibo-sche')
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
router.get('/home',async function(ctx,next){
    let result = await ProductModel.find()
    ctx.body = result
})

router.get('/',async function(ctx,next){
    ctx.body = 'index'
})

// post body数据在ctx.request.body上
router.post('/submit',async function(ctx,next){
    const productName = ctx.request.body.name
    // ProductModel.create({name:productName},function(){
    //     ctx.body =
    // })
    const res = await ProductModel.create({name:productName})

    ctx.body = res

})

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

const file = path.resolve(__dirname,'hotSearch.json')
router.get('/weiboHot',async function(ctx,next){

    const res =  await fsPromises.readFile(file)
    await ctx.render('weibohot', {
      list:JSON.parse(res.toString())
    })
})

router.post('/errlog',function(ctx,next){
  console.log(ctx.request.body.url);
  console.log(ctx.request.body);

  ctx.body = ctx.request.body
})


app.use(cors());
// multipart 支持formdata
app.use(koaBody({multipart: true}));
app.use(router.routes())
app.use(async function(ctx,next){
    ctx.body = 'render'
})

app.listen(8080)
