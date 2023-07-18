import React from 'react'
import { Link } from 'react-router-dom'
import "./PodcastCard.css"

const PodcastCard = ({podcast}) => {

  return (
    <Link to={'/podcast/${podcast.uuid}'}>
    <div onClick={() => (podcast)}>
      <div key={podcast.uuid} className='podcast-each'>
          <img src={podcast.imageUrl} alt={podcast.name} className='cover-image'/>
          <p>{podcast.name}</p>
          <p>{podcast.authorName}</p>
      </div>
    </div>
    </Link>
  )
}

export default PodcastCard