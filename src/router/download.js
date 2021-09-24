const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const path = require('path')
app.use(express.static("./"));
const open  = require('open')

app.use(cors())
app.post('/download',function (req,res) {
  // res.set("Content-type","text/plain")  //这行设置header头对前端处理没有影响
  var output = []
  fs.readFile(path.resolve(__dirname,'1.docx'), function (err, data) {
    if (err) {
      callback(err);
    } else {
      output.push(data);


      // res.write(Buffer.concat(output))
      // res.end()
      res.send({name:'按时发斯蒂芬撒旦法'})
    }
  });


})

app.listen(9090,function(){
  console.log('listen 9090');
  open('http://localhost:9090/b.html');

})
