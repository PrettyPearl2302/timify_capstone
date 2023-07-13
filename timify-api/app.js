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





// const headers = {
//   'Content-Type': 'application/json',
//   'User-Agent' : 'Timify',
//   'X-USER-ID': 484,
//   'X-API-KEY': "f0074dd996f94da9d99719653673f2d4cc35bacd7bc57d359daa48e35aeb80193bd2bc6d3df05aa388c4548856b9bb59c3",
// }

//     export const fetchPodcastSeries = () => {
//       const response = axios({
//         url: endpointURL,
//         method: "post",
//         data: graphqlQuery,
//         headers: headers
//       });
//       return response;
//     };

//     const SEARCH_FOR_TERM = `{
//       query searchForTerm($term: String, $page: Int) {
//         searchForTerm(term: $term, page: $page) {
//           searchId
//           podcastSeries {
//             uuid
//             name
//             imageUrl
//             description
//             authorName
//             datePublished
//             description
//             imageUrl
//             genres
//             itunesInfo{
//               uuid
//               publisherId
//               publisherName
//               baseArtworkUrl
//               baseArtworkUrlOf(size: 640)
//             }
//           }
//         }
//       }
      
//     }`;

//     const graphqlQuery = {
//       operationName: "fetchPodcastSeries",
//       query: `query fetchPodcastSeries ${SEARCH_FOR_TERM}`,
//       variables: {}
//     };


//     fetchPodcastSeries()
//     .then((res) => console.log("response", res.data)) // will return data object
//     .catch((err) => console.log("err", err))
    
//     async function executeQuery(query, variables) {
//       const response = await axios({
//         url: TADDY_API_ENDPOINT,
//         method: 'post',
//         data: {
//           query,
//           variables
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.TADDY_API_KEY}` // assuming you stored your API key in an environment variable
//         }
//       });
//       return response.data;
//     }
    
//     export async function getPodcastSeries(uuid) {
//       const query = `query getPodcastSeries($uuid: ID!) {
//         getPodcastSeries(uuid: $uuid){
//           // Specify the data fields you need here...
//         }
//       }`;
      
//       const data = await executeQuery(query, { uuid });
//       return data.data.getPodcastSeries; // Adjust this line based on the actual structure of `data`
//     }
    
//     export async function getPodcastEpisode(uuid) {
//       const query = `query getPodcastEpisode($uuid: ID!) {
//         getPodcastEpisode(uuid: $uuid){
//           // Specify the data fields you need here...
//         }
//       }`;
    
//       const data = await executeQuery(query, { uuid });
//       return data.data.getPodcastEpisode; // Adjust this line based on the actual structure of `data`
//     }
    



  




// podcastSeries

    // async function taddyGraphqlRequest ({query, variables}) {
  

  
//   try {
//     const client = new GraphQLClient(endpointURL, {headers})
//     const data = await client.request (query, variables)
//     return data;
//   }
//   catch (e) {
//     console.log("inside sentTaddyGraphqlRequest", e)
//   }

//   }

//   const GET_PODCASTSERIES = `
//   query getPodcastSeries($uuid: ID!) {
//     getPodcastSeries(uuid: $uuid){
//       uuid
//       name
//       imageUrl
//       description
//       authorName
//       datePublished
//       itunesId
//       genres
//       rssUrl
//       rssOwnerName
//       rssOwnerPublicEmail
//       hash
//       childrenHash
//       itunesInfo{
//         uuid
//         publisherId
//         publisherName
//         baseArtworkUrl
//         baseArtworkUrlOf(size: 640)
//       }
//     }
//   }
//   `;

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

  
//  export {taddyGraphqlRequest}
//  export const taddyQuery = {
//     GET_PODCASTSERIES,
//     GET_PODCASTEPISODE,
//  };
        

 

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