const Blog = require('../mysql/model/Blog')

const getList = async function (ctx,next) {

  const result = await Blog.findAll()

  ctx.body = result
}

module.exports = {
  getList,
}
