const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const koaBody = require('koa-body');
const {ProductModel} = require('./db.js')
var router = new Router() 

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
// multipart 支持formdata
app.use(koaBody({multipart: true}));
app.use(router.routes())
app.use(async function(ctx,next){
    ctx.body = 'render'
})

app.listen(8080)