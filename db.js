var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://152.136.155.216:27017/product',{
     useNewUrlParser: true,
     useUnifiedTopology: true
    },function(err){
        if(err){
            console.log('err');
        }
        console.log('success');
    })

var productSchema = new Schema({
    name:  String,
  });
var ProductModel = mongoose.model('Product', productSchema);

module.exports = {
    ProductModel
}