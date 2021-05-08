const seq = require('../basic')
const {INTEGER, STRING, TEXT} = require('../types')

const Blog = seq.define('blog', {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    comment: '博客 ID'
  },
  title: {
    type: TEXT,
    allowNull: false,
    comment: '博客标题'
  },
  url: {
    type: STRING,
    comment: 'url 地址'
  },
  author_name: {
    type: STRING,
    comment: '作者名字'
  },
},{
  timestamps: false
})

module.exports = Blog
