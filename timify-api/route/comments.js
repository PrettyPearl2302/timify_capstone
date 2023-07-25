import express from 'express';
import { Comment } from '../models/comment.js';

const router = express.Router();

router.post('/comments', async (req, res) => {
    const { content, userId, episodeId } = req.body; // Assuming the request body contains 'content', 'userId', and 'episodeId'.
    
    try {
      // Create a new comment in the database
      const newComment = await Comment.create({
        content,
        userId,
        episodeId,
      });
  
      // Optionally, you can add additional logic here, such as fetching the associated user or episode data and including them in the response.
  
      res.status(201).json({ comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  export default router;