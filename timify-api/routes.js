import express from 'express'
import cors from 'cors'
import { getPodcastEpisode, getPodcastSeries, searchForTerm, searchForEpisode } from './app.js'
const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/home', async (req, res) => {
  const term = ''
  const page = 1
  const limitPerPage = 10
  const Genres = ['PODCASTSERIES_BUSINESS', 'PODCASTSERIES_COMEDY', 'PODCASTSERIES_HEALTH_AND_FITNESS', 'PODCASTSERIES_NEWS', 'PODCASTSERIES_SOCIETY_AND_CULTURE', 'PODCASTSERIES_SPORTS']

  const podcastByGenre = {}
  let errorOccurred = null

  for (const Genre of Genres) {
    try {
      const podcasts = await searchForTerm(term, page, limitPerPage, [Genre])
      podcastByGenre[Genre] = podcasts.podcastSeries
    } catch (err) {
      console.error(err)
      if (!errorOccurred) {
        errorOccurred = err
      }
    }
  }

  if (errorOccurred) {
    res.status(500).send(errorOccurred.message)
  } else {
    res.json(podcastByGenre)
  }
})

app.get('/api/getepisodes', async (req, res) => {
  const term1 = ''
  const page1 = 1
  const limitPerPage1 = 25
  try {
    const episodes = await searchForEpisode(term1, page1, limitPerPage1)
    res.json(episodes)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

app.get('/api/search', async (req, res) => {
  const { term } = req.query
  try {
    const podcasts = await searchForTerm(term, 1, 25, [])
    res.json(podcasts)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

app.get('/api/podcast', async (req, res) => {
  const { id } = req.query
  try {
    const podcasts = await getPodcastSeries(id)
    res.json(podcasts)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

app.get('/api/podcast/episode', async (req, res) => {
  const { id } = req.query
  try {
    const episode = await getPodcastEpisode(id)
    res.json(episode)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

app.get('/api/recommendations', async (req, res) => {
  const { Genre } = req.query
  try {
    const recPodcasts = await searchForTerm('', 1, 10, [Genre])
    res.json(recPodcasts)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
