import React from 'react'
import { Link } from 'react-router-dom'
import "./SearchResultCard.css"

const SearchResultCard = ({podcast}) => {

  return (
    <Link to={`/podcast/${podcast.uuid}`} style={{textDecoration: "none" , color: "inherit"}} >
    <div onClick={() => (podcast)}>
        <div key={podcast.uuid} className='search-podcast-each'>
        <img src={podcast.imageUrl} alt={podcast.name} className='search-cover-image'/>
          <div className='search-podcast-text'>
          <p>{podcast.name}</p>
          <p>{podcast.authorName}</p>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default SearchResultCard