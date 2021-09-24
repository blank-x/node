const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');
const views = require('koa-views')
const KoaStatic = require('koa-static')
// const mount=require('koa-mount')
const path = require('path')
const cors = require('@koa/cors');
const router = require('./router')
const {ApolloServer} = require('apollo-server-koa')
// const {typeDefs, resolvers} = require('./graphql/schema')
// const apollo = new ApolloServer({typeDefs, resolvers})
const errorCatch = require('./middlewares/errorCatch')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const onerror = require('koa-onerror')
const json = require('koa-json')
const logger = require('koa-logger')


app.use(errorCatch)

// error handler：页面显示
let onerrorConf = {}
if (false) {
    onerrorConf = { redirect: '/error' }
}

onerror(app, onerrorConf)
// const { SESSION_SECRET_KEY } = require('./conf/session')
// const { REDIS_CONF } = require('./conf/redis')
// app.keys = [SESSION_SECRET_KEY]
// app.use(
//     session({
//         key: 'node.sid', //cookie name默认是'koa.sid'
//         prefix: 'node:sess:', //redis key的前缀，默认"koa:sess:"
//         cookie: {
//             path: '/',
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000 //单位ms
//         },
//         store: redisStore({
//             all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
//         })
//     })
// )

app.use(json())
app.use(logger())
// require('./weibo-sche')
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))
app.use(KoaStatic(__dirname + '/static'))
app.use(cors());
app.use(koaBody({multipart: true}));

router(app)
/*
* 定义路径
* */
// app.use(apollo.getMiddleware({path:'/n/graphql'}))
// multipart 支持formdata

app.use(async function (ctx, next) {

  next()
})
// error-handling:打印到控制台
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})
app.listen(8060)
