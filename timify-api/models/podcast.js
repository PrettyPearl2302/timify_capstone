import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'

export const Podcast = sequelize.define('Podcast', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})
