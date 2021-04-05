var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductModel = require('./schema/product')
var StudentInfo = require('./schema/info')
var Student = require('./schema/student')
var Course = require('./schema/course')

// const dbPath = 'mongodb://152.136.155.216:27017/product'
const dbPath = 'mongodb://localhost:27017/product'
mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    console.log('err');
  }
  console.log('success');
})
mongoose.connection.on('disconnected', () => {
  mongoose.connect(dbPath)
})
mongoose.connection.on('error', err => {
  console.error(err)
})

mongoose.connection.on('open', async () => {
  console.log('Connected to MongoDB ', dbPath)
})

module.exports = {
  ProductModel,
  StudentInfo,
  Student,
  Course
}
