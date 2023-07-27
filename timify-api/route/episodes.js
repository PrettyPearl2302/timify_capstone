import express from 'express'
import { Episode } from '../models/episode.js'

const router = express.Router()

router.post('/episodes', async (req, res) => {
  const { uuid } = req.body
  try {
    const newEpisode = await Episode.create({
      uuid
    })

    res.status(201).json({ episode: newEpisode })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
