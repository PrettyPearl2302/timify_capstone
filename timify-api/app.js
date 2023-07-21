import dotenv  from "dotenv"
import axios from "axios";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json()); 
app.use(morgan('combined'))

const endpointURL = "https://api.taddy.org"

async function taddyGraphqlRequest(query, variables) {
  try {
    const response = await axios({
      url: endpointURL,
      method: 'post',
      data: {
        query,
        variables
      },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Timify',
        'X-USER-ID': 484,
        'X-API-KEY': `${process.env.API_KEY}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in taddyGraphqlRequest:", error);
  }
}


export async function searchForTerm(term, page, limitPerPage, filterForGenres) {
  const query = `
    query SearchForTerm($term: String!, $page: Int!, $limitPerPage: Int!, $filterForGenres: [Genre]) {
      searchForTerm(term: $term, page: $page, limitPerPage: $limitPerPage, filterForGenres: $filterForGenres ) {
        searchId
        podcastSeries {
          uuid
          name
          imageUrl
          description
          authorName
          datePublished
          description
          imageUrl
          genres
          itunesInfo{
            uuid
            publisherId
            publisherName
            baseArtworkUrl
            baseArtworkUrlOf(size: 640)
          }
        }
      }
    }
  `;

  const data = await taddyGraphqlRequest(query, { term, page, limitPerPage, filterForGenres });
    if (data.errors) {
      console.error(data.errors)
    }
  return data.data.searchForTerm; 
}


export async function getPodcastSeries(uuid) {
  const query = `
    query getPodcastSeries($uuid: ID!) {
      getPodcastSeries(uuid: $uuid ) {
        uuid
        name
        datePublished
        description
        imageUrl
        genres
        seriesType
        copyright
        authorName
        isBlocked
        episodes{
          uuid
          name
          datePublished
          description
          audioUrl
          fileLength
          fileType
          duration
          seasonNumber
          episodeNumber
        }
      }
    }
  `;

  const response = await taddyGraphqlRequest(query, { uuid });
    if (response.errors) {
      console.error(response.errors)
    }
  return response.data.getPodcastSeries; 
}


export async function getPodcastEpisode(uuid) {
  const query = `
    query getPodcastEpisode($uuid: ID!) {
      getPodcastEpisode(uuid: $uuid ) {
        uuid
        name
        datePublished
        description(shouldStripHtmlTags: true)
        imageUrl
        audioUrl
        episodeType
        fileLength
        fileType
        duration
        seasonNumber
        episodeNumber
        isBlocked
        podcastSeries{
          uuid
          name
        }
      }
    }
  `;

  const response = await taddyGraphqlRequest(query, { uuid });
    if (response.errors) {
      console.error(response.errors)
    }
  return response.data.getPodcastEpisode; 
}







