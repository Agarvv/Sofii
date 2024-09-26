const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Imprime las variables de entorno para depuración
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT); // Añadido para depuración

// Ruta al certificado SSL (si es necesario)
const sslCA = fs.readFileSync(path.resolve(__dirname, 'certs/ca.pem'), 'utf8'); // Si no usas SSL, puedes omitir esto

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Añadido para el puerto
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            ca: sslCA // Si no usas SSL, puedes omitir esto
        },
        connectTimeout: 60000
    }
});

module.exports = sequelize;
