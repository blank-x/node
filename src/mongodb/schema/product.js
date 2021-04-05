const mongoose = require('mongoose')

const Schema = mongoose.Schema
var product = new Schema({
  name: String,
});
var ProductModel = mongoose.model('Product', product);


module.exports = ProductModel
