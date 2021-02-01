import { dataBaseConfig } from '@config'
import { Sequelize } from 'sequelize'
import { isDev } from '@utils'

const { database, user, password, options } = dataBaseConfig

const DB = new Sequelize(database, user, password, {
  ...options,
  logging: isDev ? console.log : false, // 是否输出数据库日志
})

const init = (): Promise<void> => {
  return new Promise(async (resolve) => {
    await DB.sync({ alter: isDev })
    console.log('All models were synchronized successfully.')
    resolve()
  })
}
export { init }
export default DB
