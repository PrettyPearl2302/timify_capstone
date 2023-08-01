import axios from 'axios'
import { User, Rating, Episode } from './models/index.js'
import { sequelize } from './database.js'

function generateRandomRating (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const seedFakeRatings = async () => {
  try {
    const episodesResponse = await axios.get('http://localhost:5000/api/getepisodes')
    const episodes = episodesResponse.data.podcastEpisodes

    await sequelize.sync({ alter: true })

    for (const episode of episodes) {
      const { uuid } = episode

      await Episode.create({ uuid })
    }

    console.log('Episodes seeded successfully.')

    const users = await User.findAll()
    const userIds = users.map((user) => user.id)

    for (const userId of userIds) {
      for (const episode of episodes) {
        const { uuid } = episode
        const ratingValue = generateRandomRating(1, 5)
        console.log(episode.uuid)

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
