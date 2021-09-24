### nodejs koa mongodb 
nodejs server  启动

### 需要实现的功能

*[ ] 路由
*[ ] 重定向
*[ ] 跨域
*[ ] 中间件
*[ ] session
*[ ] cookie
*[ ] mongodb mongoose
*[ ] 日志记录
*[ ] 模板渲染
*[ ] 表单处理
*[ ] 表单文件处理
*[ ] 静态资源支持
*[ ] Docker
*[ ] 接口单元测试
*[ ] 程序单元测试

- morgan
- serve-favicon 
- ejs

找时间对比一下中间价是否能用
```js
const koaJsonError = require('koa-json-error'); // 错误状态码捕获处理中间件

app.use(koaJsonError({
  postFormat: (e, {stack, ...rest}) => {
    return process.env.NODE_ENV === 'production' ? rest: {stack, ...rest}
  }
}));
 
const parameter = require('koa-parameter'); // 校验参数中间件
app.use(parameter(app));

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploadFiles'), // 设置上传目录
        keepExtensions: true // 保留扩展名
    }
}));
```


## mongoose

```
ofMixed:    [Schema.Types.Mixed],
ofObjectId: [Schema.Types.ObjectId],
```
