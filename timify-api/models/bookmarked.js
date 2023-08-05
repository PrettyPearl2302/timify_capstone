import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'

export const Bookmarked = sequelize.define('Bookmarked', {
  podcastId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
