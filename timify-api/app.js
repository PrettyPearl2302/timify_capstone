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
  const response = await axios({
    url: endpointURL,
    method: 'post',
    data: {
      query,
      variables
    },
    headers : {
      'Content-Type': 'application/json',
      'User-Agent' : 'Timify',
      'X-USER-ID': 484,
      'X-API-KEY': `${process.env.API_KEY}`,
    }
  });
  return response.data;
}

export async function searchForTerm(term, page) {
  const query = `
    query SearchForTerm($term: String!, $page: Int!) {
      searchForTerm(term: $term, page: $page) {
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

  const data = await taddyGraphqlRequest(query, { term, page });
  return data.data.searchForTerm; 
}








  





//   const GET_PODCASTEPISODE = `
//   query getPodcastEpisode($uuid: ID!) {
//     getPodcastEpisode(uuid: $uuid){
//       uuid
//       hash
//       name
//       description
//       imageUrl
//       datePublished
//       subtitle
//       audioUrl
//       fileLength
//       fileType
//       duration
//       episodeNumber
//       podcastSeries{
//         uuid
//         name
//         rssUrl
//         itunesId
//       }
//     }
//   }`;

