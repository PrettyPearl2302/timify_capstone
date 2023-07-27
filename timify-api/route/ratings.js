import express from 'express';
import { Rating } from '../models/rating.js';

const router = express.Router();

router.post('/ratings', async (req, res) => {
  const { ratingValue, episodeId, userId } = req.body;

    try {
      const newRating = await Rating.create({
        ratingValue,
        episodeId,
        userId,
      });
      res.status(201).json({ rating: newRating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  export default router;