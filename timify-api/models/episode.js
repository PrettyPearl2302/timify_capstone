import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { PodcastSeries } from './podcastseries.js';

export const Episode = sequelize.define('Episode', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    name: {
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
    datePublished: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    audioUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileLength: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    episodeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    podcastSeriesUuid: {
        type: DataTypes.UUID,
        references: {
          model: PodcastSeries,
          key: 'uuid'
        }
    }
    
})

PodcastEpisode.belongsTo(PodcastSeries, { foreignKey: 'podcastSeriesUuid', as: 'podcastSeries' });

// subtitle
//       audioUrl
//       fileLength
//       fileType
//       duration
//       episodeType
//       episodeNumber
//       podcastSeries{
//         uuid
//         name
//         rssUrl
//         itunesId
//       } -ask gpt