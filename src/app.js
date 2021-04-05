const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');
const views = require('koa-views')
const KoaStatic = require('koa-static')
const path = require('path')
const cors = require('@koa/cors');
const router = require('./router')
const { ApolloServer } = require('apollo-server-koa')
const { typeDefs, resolvers } = require('./graphql/schema')
const apollo = new ApolloServer({ typeDefs, resolvers })

require('./weibo-sche')
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(KoaStatic(__dirname + '/static'))
app.use(cors());
app.use(koaBody({multipart: true}));

router(app)
app.use(apollo.getMiddleware())
// multipart 支持formdata

app.use(async function(ctx,next){
    next()
})

app.listen(8080)
