import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const ItunesInfo = sequelize.define('ItunesInfo', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  publisherId: {
    type: DataTypes.STRING,
    allowNull: false
},
  publisherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  baseArtworkUrl: {
  type: DataTypes.STRING,
  allowNull: false
  },
  baseArtworkUrlOf640: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
