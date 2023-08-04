import express from 'express'
import { Bookmarked } from '../models/bookmarked.js'

const router = express.Router()

router.post('/bookmarks', async (req, res) => {
  const { podcastId, authorName, name, genre, description, imageUrl, userId } = req.body
  try {
    const newBookmark = await Bookmarked.create({
      podcastId,
      authorName,
      name,
      genre,
      description,
      imageUrl,
      userId
    })
    res.status(201).json({ bookmarked: newBookmark })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
