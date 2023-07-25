import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Episode = sequelize.define('Episode', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
  });
  


