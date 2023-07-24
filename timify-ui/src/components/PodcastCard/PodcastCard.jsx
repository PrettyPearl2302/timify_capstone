import React from 'react'
import { Link } from 'react-router-dom'
import "./PodcastCard.css"

const PodcastCard = ({podcast}) => {

  return (
    <Link to={`/podcast/${podcast.uuid}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div onClick={() => (podcast)}>
        <div key={podcast.uuid} className='podcast-each'>
            <img src={podcast.imageUrl} alt={podcast.name} className='cover-image'/>
            <div className='podcast-text'>
            <p>{podcast.name}</p>
            <p>{podcast.authorName}</p>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default PodcastCard