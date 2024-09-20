const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sofi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})



module.exports = sequelize