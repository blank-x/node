const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/mysql')
const {isProd, isTest} = require('../utils/env')
console.log(MYSQL_CONF);
const {host, user, password, database} = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  }
}

if (isTest) {
  conf.logging = () => {
  }
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000  // 如果一个连接池 10 s 之内没有被使用，则释放
  }
}

const basic = new Sequelize(database, user, password, conf)

module.exports = basic
