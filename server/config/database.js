const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Ruta al certificado SSL
const sslCA = fs.readFileSync(path.resolve(__dirname, 'certs/ca.pem'), 'utf8');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            ca: sslCA 
        }
    }
});

module.exports = sequelize;
