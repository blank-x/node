const {ProductModel} = require('../mongodb/db.js')

const index = async (ctx,next)=>{
  ctx.body = 'index'
}


const home = async (ctx,next)=>{
  let result = await ProductModel.find()
  ctx.body = result
}

const submit = async (ctx,next)=>{
  const productName = ctx.request.body.name

  const res = await ProductModel.create({name:productName})

  ctx.body = res

}

module.exports = {
  index,
  home,
  submit
}
