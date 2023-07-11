import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const PodcastSeries = sequelize.define('PodcastSeries', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
    },
  rssUrl:{
    type: DataTypes.STRING,
    allowNull: false
  },
  itunesId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
});
