import React from 'react'
import "./PodcastCard.css"

const PodcastCard = ({podcast}) => {
  
  return (
    <div key={podcast.id} className='podcast-each'>
         <img src={podcast.cover} alt={podcast.title} />
         <p>{podcast.title}</p>
         <p>{podcast.host}</p>
    </div>
  )
}

export default PodcastCard