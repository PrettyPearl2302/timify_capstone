import React from 'react'
import { Link } from 'react-router-dom'
import "./EpisodeDetail.css"

const EpisodeDetail = ({episode}) => {

  return (
    <>
    <div onClick={() => (podcast)}>
    <div onClick={() => (episode)}>
      <div key={episode.uuid} className='episode-each'>
        <Link to={`/podcast/episode/${episode.uuid}`} style={{ textDecoration: "none", color: "inherit" }}>
          <p className="episode-info">{episode.name}</p> //
        </Link> 
        <p className="episode-info">{episode.episodeNumber}</p>
        <p className="episode-info">{episode.duration}</p>
      </div>
    </div>
    </div>
    </>
    
  )
}

export default EpisodeDetail