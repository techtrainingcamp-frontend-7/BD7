console.log(process.env);
const config = {
  port: '8003',
  host:
    // "https://api.hokori.online" ||
    'http://localhost/',
  // 完整URL为： nginx配置下的转发路径 `${location}`
  // baseURL: "/geekblog" || ""
  baseURL: '/bd7',
  dataBaseConfig: {
    // 数据库名
    database: 'bd7',

    // 数据库账号
    user: 'bd7',

    // 密码
    password: 'M4NshB5mLw5r5c83',

    // options
    options: {
      // 数据库类别
      dialect: 'mysql',

      // 主机，如IP 或 'localhost'
      host: '101.201.239.229',

      // 端口, MySQL默认端口3306
      port: '3306',

      // 字符集
      charset: 'utf8mb4',

      // 连接池
      pool: {
        max: 20,
        min: 1,
        idle: 30000,
        acquire: 60000
      },

      // 时区
      timezone: '+08:00'
    }
  }
};
module.exports = config;
