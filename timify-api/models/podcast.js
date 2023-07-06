import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Podcast = sequelize.define('Podcast', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  host: {
    type: DataTypes.STRING,
    allowNull: false
  }
});