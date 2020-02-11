const dbConfig = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})
// new Sequelize(`postgres://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:5432/${dbConfig.DB}`, {
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.customers = require("./customers.model.js")(sequelize, Sequelize)

module.exports = db
