import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./SearchResultCard.css"

const SearchResultCard = ({podcast}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Link to={`/podcast/${podcast.uuid}`} style={{textDecoration: "none" , color: "inherit"}} >
    <div className='search-card-container'>
        <div key={podcast.uuid} className='search-podcast-each' onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <img src={podcast.imageUrl} alt={podcast.name} className='search-cover-image'/>
          <div className='search-podcast-text'>
          <p>{podcast.name}</p>
          <p>{podcast.authorName}</p>
          </div>
        </div>
        {showTooltip && <div className='tooltip'> {podcast.description} </div>}
    </div>
    </Link>
  )
}

export default SearchResultCard