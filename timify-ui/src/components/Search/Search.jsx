import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Search.css'

const Search = () => {
    const [term, setTerm] = useState('')
    const [podcastsByGenre, setPodcastsByGenre] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/search?term=${term}`);
            setPodcastsByGenre(response.data.podcastSeries);  
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="search-bar">
          <form className="search-input" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Explore podcasts..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div>
            {podcastsByGenre.map((podcast) => (
              <div key={podcast.uuid}>{podcast.name}</div>
            ))}
          </div>
        </div>
      );
}

export default Search

