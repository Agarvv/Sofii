import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    dialect: 'mysql',
    logging: true,
    dialectOptions: {
      connectTimeout: 60000
    }
  }
);

export default sequelize;