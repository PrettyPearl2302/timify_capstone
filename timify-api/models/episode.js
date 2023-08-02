import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'
import { Podcast } from './podcast.js'

export const Episode = sequelize.define('Episode', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  podcastId: {
    type: DataTypes.UUID,
    references: {
      model: Podcast,
      key: 'uuid'
    },
    onDelete: 'CASCADE'
  }
})
