"use  strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
let transporter = nodemailer.createTransport({
  service: "qq",  //  使用了内置传输发送邮件  查看支持列表：https://nodemailer.com/smtp/well-known/
  secureConnection: true,  //  使用了  SSL
  auth: {
    user: "591533357@qq.com",
    pass: "hlsgnbmmyjpfbdci",  //授权码，并非QQ密码
  },
});
let mailOptions = {
  from: '"撒大声地"  <591533357@qq.com>',  //  发送地址
  to: "591533357@qq.com",  //  接收列表（可多个）
  subject: "Hello,this  is  alan  from  China!",  //  主题
  //  发送text或者html格式（任选一个）
  // text: 'Hello  world！',  //  plain  text  body
  html:    fs.createReadStream(path.resolve(__dirname,'index.html')),
  // html: '<img  src="cid:01">',
  attachments: [                                  //添加附件（可多个）
    {
      filename: "image",
      path: path.resolve(__dirname, "2.png"),
      cid: "01",//与上面的图片cid对应
    },
    {
      filename: "a.txt",
      content: "hello  world!",
    },
    {
      filename: "b.txt",
      path: "./text.txt",//根目录新建即可
    },
  ],
};

//  发送邮件
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log(info);
});

