import React from 'react';
import './Search.css'

const Search = () => {
  
    return (
        <div className="search-bar">
            <form className='search-input'>
                <input
                type='text'
                placeholder='Explore podcasts...'
                >   
                </input>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search