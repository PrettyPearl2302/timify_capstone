import axios from 'axios'
import { Comment } from './models/index.js'
import { sequelize } from './database.js'
import { faker } from '@faker-js/faker'

async function seedComments () {
  try {
    const episodesResponse = await axios.get('http://localhost:3000/episodes')
    const episodes = episodesResponse.data
    const existingEpisodeIds = episodes.map((episode) => episode.uuid)

    const usersReponse = await axios.get('http://localhost:3000/users')
    const users = usersReponse.data
    const existingUserIds = users.map((user) => user.id)
    const existingUserNames = users.map((user) => user.username)

    const numCommentsToSeed = 150

    const commentsToSeed = []

    await sequelize.sync({ alter: true })

    for (let i = 0; i < numCommentsToSeed; i++) {
      const randomContent = faker.lorem.sentence()
      const randomUserId = existingUserIds[Math.floor(Math.random() * existingUserIds.length)]
      const randomUserName = existingUserNames[Math.floor(Math.random() * existingUserNames.length)]
      const randomEpisodeId = existingEpisodeIds[Math.floor(Math.random() * existingEpisodeIds.length)]
      const randomTimestamp = faker.datatype.number({ min: 10, max: 1000 })

      const comment = {
        content: randomContent,
        userId: randomUserId,
        userName: randomUserName,
        episodeId: randomEpisodeId,
        timestamp: randomTimestamp
      }

      commentsToSeed.push(comment)
    }

    await Comment.bulkCreate(commentsToSeed)

    console.log(`${numCommentsToSeed} comments seeded successfully.`)
  } catch (error) {
    console.error('Error seeding comments:', error)
  } finally {
    process.exit()
  }
}

seedComments()
