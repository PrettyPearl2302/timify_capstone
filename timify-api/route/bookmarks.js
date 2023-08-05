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

router.delete('/bookmarks/:podcastId', async (req, res) => {
  const { podcastId } = req.params

  const userId = req.headers.authorization

  try {
    const bookmark = await Bookmarked.findOne({
      where: {
        podcastId,
        userId
      }
    })
    if (!bookmark) {
      // If the bookmark with the given ID doesn't exist or doesn't belong to the user, return an error response
      return res.status(404).json({ error: 'Bookmark not found or unauthorized' })
    }

    await bookmark.destroy().then(() => res.status(204).json())
  } catch (error) {
    // Handle any potential errors during the deletion process
    console.error('Error deleting bookmark:', error)
    res.status(500).json({ error: 'An error occurred while deleting the bookmark' })
  }
})

export default router
