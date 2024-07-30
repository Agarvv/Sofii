const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sofi', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
})

module.exports = sequelize