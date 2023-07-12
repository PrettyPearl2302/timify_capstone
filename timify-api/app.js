import dotenv  from "dotenv"
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {GraphQLClient} from 'graphql-request'

dotenv.config()

const app = express();


app.use(cors())
app.use(express.json()); 
app.use(morgan('combined'))

async function taddyGraphqlRequest ({query, variables}) {
  const endpointURL = "https://api.taddy.org"

  const headers = {
    'Content-Type': 'application/json',
    'User-Agent' : 'Timify',
    'X-USER-ID': 484,
    'X-API-KEY': "f0074dd996f94da9d99719653673f2d4cc35bacd7bc57d359daa48e35aeb80193bd2bc6d3df05aa388c4548856b9bb59c3",
  }

  try {
    const client = new GraphQLClient(endpointURL, {headers})
    const data = await client.request (query, variables)
    return data;
  }
  catch (e) {
    console.log("inside sentTaddyGraphqlRequest", e)
  }

  }

  const GET_PODCASTSERIES = `
  query getPodcastSeries($uuid: ID!) {
    getPodcastSeries(uuid: $uuid){
      uuid
      name
      imageUrl
      description
      authorName
      datePublished
      itunesId
      genres
      rssUrl
      rssOwnerName
      rssOwnerPublicEmail
      hash
      childrenHash
      itunesInfo{
        uuid
        publisherId
        publisherName
        baseArtworkUrl
        baseArtworkUrlOf(size: 640)
      }
    }
  }
  `;

  const GET_PODCASTEPISODE = `
  query getPodcastEpisode($uuid: ID!) {
    getPodcastEpisode(uuid: $uuid){
      uuid
      hash
      name
      description
      imageUrl
      datePublished
      subtitle
      audioUrl
      fileLength
      fileType
      duration
      episodeNumber
      podcastSeries{
        uuid
        name
        rssUrl
        itunesId
      }
    }
  }`;

  
 export {taddyGraphqlRequest}
 export const taddyQuery = {
    GET_PODCASTSERIES,
    GET_PODCASTEPISODE,
 };
        

 

//   (async () => {
//   const podcastsQuery = {
//     query: GET_PODCASTSERIES,
//     variables: {uuid: "cb8d858a-3ef4-4645-8942-67e55c0927f2"}
//   };

//   const data = await taddyGraphqlRequest(podcastsQuery);
//   console.log(data);
// })();

// (async () => {
//   const episodesQuery = {
//     query: GET_PODCASTEPISODE,
//     variables: {uuid: "d682a935-ad2d-46ee-a0ac-139198b83bcc"}
//   };

//   const data = await taddyGraphqlRequest(episodesQuery);
//  console.log(data);
// })();