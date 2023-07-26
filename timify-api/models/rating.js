import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Rating = sequelize.define('Rating', {
    ratingValue: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    episodeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});