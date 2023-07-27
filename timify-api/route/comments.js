import express from 'express';
import { Comment } from '../models/comment.js';

const router = express.Router();

router.post('/comments', async (req, res) => {

    const { content, userId, episodeId, timestamp } = req.body; 
    try {
      const newComment = await Comment.create({
        content,
        userId,
        episodeId,
        timestamp,
      });
      res.status(201).json({ comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  export default router;