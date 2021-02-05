import config from 'bd7.config'
import { Sequelize } from 'sequelize'
import { isDev } from 'utils'
const { dataBaseConfig } = config

const { database, user, password, options } = dataBaseConfig

const sequelize = new Sequelize(database, user, password, {
  ...options,
  logging: isDev ? console.log : false, // 是否输出数据库日志
})

const init = async () => {
  await sequelize.sync({ alter: isDev })
  console.log('All models were synchronized successfully.')
}
export { init }
export default sequelize
