import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const User = sequelize.define('User', {
    first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
    last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
    username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});