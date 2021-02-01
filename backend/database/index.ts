import { dataBaseConfig } from '@config'
import { Sequelize } from 'sequelize'

const { database, user, password, options } = dataBaseConfig
const isDev = process.env.NODE_ENV === 'development'

const DB = new Sequelize(database, user, password, {
  ...options,
  logging: isDev ? console.log : false, // 是否输出数据库日志,
})

const init = async () => {
  try {
    // await DB.authenticate();
    // console.log('Connection has been established successfully.');
    await DB.sync({ alter: isDev })
    console.log('All models were synchronized successfully.')
    return true
  } catch (error) {
    throw new Error(
      `Unable to connect to the database: ${Object.toString.apply(error)}`,
    )
  }
}
export { init }

export default DB
