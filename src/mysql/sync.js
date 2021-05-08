const seq = require('./basic')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch((e) => {
    console.log(e)
})

// 执行同步
seq.sync({ force: false }).then(() => {
    console.log('sync ok')
    process.exit()
})
