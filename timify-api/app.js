import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { Podcast } from './models/index.js';

const app = express();

app.use(cors())
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan())


app.get('/', (req, res) => {
  res.send("it works"); 
});

// Route to get all podcasts
app.get('/podcasts', async (req, res) => {
    try {
      const podcasts = await Podcast.findAll();
      res.json(podcasts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

sequelize.sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });