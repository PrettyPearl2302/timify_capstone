import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
});
