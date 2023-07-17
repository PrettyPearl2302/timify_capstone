import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Search.css'
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';

const Search = () => {
    const [term, setTerm] = useState('')
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        navigate({
            pathname: '/search',
            search:`?${createSearchParams(term)}`,
          })
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
        </div>
      );
}

export default Search

