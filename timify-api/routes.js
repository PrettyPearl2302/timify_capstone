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
  const limitPerPage = 10;
  const Genres = ["PODCASTSERIES_BUSINESS", "PODCASTSERIES_COMEDY", "PODCASTSERIES_HEALTH_AND_FITNESS", "PODCASTSERIES_NEWS", "PODCASTSERIES_SOCIETY_AND_CULTURE", "PODCASTSERIES_SPORTS"]

  let podcastByGenre = [];
  let errorOccurred = null;

  for (let Genre of Genres) {
      try {
          const podcasts = await searchForTerm(term, page, limitPerPage, [Genre]);
          console.log(Genre, podcasts)
          podcastByGenre.push(...podcasts.podcastSeries)
      } catch (err) {
          console.error(err);
          if (!errorOccurred) {
            errorOccurred = err;
          }
      }
  }

  if (errorOccurred) {
    res.status(500).send(errorOccurred.message);
  } else {
    res.json(podcastByGenre);
  }
});


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
