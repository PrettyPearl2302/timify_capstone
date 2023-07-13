import { searchForTerm } from './app.js'; // assuming taddyService.js is in the same directory

// This is an async function so we can use await
async function test() {
  try {
    // Replace "example term" with the term you want to search for, and 1 with the page number you want to fetch
    const results = await searchForTerm("", 1);

    // This should log the results to your console
    console.log(results);
  } catch (error) {
    // If there's an error, this will log it
    console.error('An error occurred:', error);
  }
}

test();
