import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
});
