import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

const db = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'aaptour_db',
  logging: process.env.DB_LOGGING === 'true', 
});

export default db;
