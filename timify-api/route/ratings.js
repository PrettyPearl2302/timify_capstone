import express from 'express'
import { Rating } from '../models/rating.js'

const router = express.Router()

router.post('/ratings', async (req, res) => {
  const { ratingValue, episodeId, userId } = req.body

  try {
    const existingRating = await Rating.findOne({
      where: {
        episodeId,
        userId
      }
    })

    if (existingRating) {
      existingRating.ratingValue = ratingValue
      await existingRating.save()

      res.status(200).json({ rating: existingRating })
    } else {
      const newRating = await Rating.create({
        ratingValue,
        episodeId,
        userId
      })

      console.log('New rating created:', newRating)
      res.status(201).json({ rating: newRating })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
