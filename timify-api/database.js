import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('capstone', 'pearlwogu', 'bernadette is my mom', {
  host: 'localhost',
  dialect: 'postgres'
});