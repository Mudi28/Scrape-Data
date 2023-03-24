import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import configJS from '../config/config'
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development' // Use development if no environment is specified
const config = configJS[env]
const db = {}
console.log(env)
let sequelize
// if environment is development, create a new Sequelize instance using environment variables
if (config.environment === 'development') {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DRIVER,
      dialectOption: {
        ssl: true,
        native: true,
      },
      logging: true,
    },
  )
  // if environment is not development, create a new Sequelize instance using the configuration in config.js
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  )
}
// load all models in this directory and add them to the db object
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
// call associate function on each model to associate them with other models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
// set sequelize and Sequelize to the db object and export it
db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
