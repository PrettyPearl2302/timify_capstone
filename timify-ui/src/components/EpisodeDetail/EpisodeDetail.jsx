import React from 'react'
import { Link } from 'react-router-dom'
import "./EpisodeDetail.css"

const EpisodeDetail = ({episode}) => {

  return (
    <Link to={`/podcast/episode/${episode.uuid}`}>
    <div onClick={() => (episode)}>
      <div key={episode.uuid} className='episode-each'>
        <p className="episode-info">{episode.name}</p>
        <p className="episode-info">{episode.episodeNumber}</p>
        <p className="episode-info">{episode.duration}</p>
      </div>
    </div>
    </Link>
    
  )
}

export default EpisodeDetail