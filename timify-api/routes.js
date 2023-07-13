import express from 'express'
import cors from 'cors'
import { searchForTerm } from './app.js';
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());

// routes to get podcasts for home page display
app.get('/api/home', async (req, res) => {
    const term = ""; 
    const page = 1;
    const limitPerPage = 25;
    const filterForGenres = ["PODCASTSERIES_BUSINESS"];
  
    try {
      const podcasts = await searchForTerm(term, page, limitPerPage, filterForGenres);
      res.json(podcasts);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
