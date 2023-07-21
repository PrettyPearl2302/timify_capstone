import React from 'react'
import { Link } from 'react-router-dom'
import "./SearchResultCard.css"

const SearchResultCard = ({podcast}) => {

  return (
    <Link to={`/podcast/${podcast.uuid}`}>
    <div onClick={() => (podcast)}>
        <div key={podcast.uuid} className='search-podcast-each'>
        <img src={podcast.imageUrl} alt={podcast.name} className='search-cover-image'/>
          <p>{podcast.name}</p>
          <p>{podcast.authorName}</p>
        </div>
    </div>
    </Link>
  )
}

export default SearchResultCard