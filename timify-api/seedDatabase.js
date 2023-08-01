import axios from 'axios'
import { User, Rating, Episode, Podcast } from './models/index.js'
import { sequelize } from './database.js'

function generateRandomRating (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const seedFakeRatings = async () => {
  try {
    const episodesResponse = await axios.get('http://localhost:5000/api/getepisodes')
    const { podcastEpisodes } = episodesResponse.data

    await sequelize.sync({ alter: true })

    for (const episodeData of podcastEpisodes) {
      const { uuid, podcastSeries } = episodeData
      const { uuid: seriesUuid, name: seriesName, genres } = podcastSeries

      const [podcast, created] = await Podcast.findOrCreate({
        where: { uuid: seriesUuid },
        defaults: {
          name: seriesName,
          genre: genres[0]
        }
      })

      await Episode.create({
        uuid,
        podcastId: seriesUuid
      })

      const users = await User.findAll()
      const userIds = users.map((user) => user.id)

      for (const userId of userIds) {
        const ratingValue = generateRandomRating(1, 5)

        await Rating.create({
          ratingValue,
          episodeId: uuid,
          userId
        })
      }
    }
    console.log('Fake ratings seeded successfully.')
  } catch (err) {
    console.error('Error seeding fake ratings:', err.message)
  } finally {
    await sequelize.close()
  }
}

seedFakeRatings()
