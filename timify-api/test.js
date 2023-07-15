import { searchForTerm } from './app.js'; 

async function test() {
  try {
  
    const results = await searchForTerm("", 1, 10, "PODCASTSERIES_BUSINESS");

  } catch (error) {
   
    console.error('An error occurred:', error.response);
  }
}

test();
