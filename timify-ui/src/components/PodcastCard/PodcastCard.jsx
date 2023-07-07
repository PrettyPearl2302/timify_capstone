import React from 'react'
import "./PodcastCard.css"

const PodcastCard = ({podcast}) => {
  
  return (
    <div key={podcast.id} className='podcast-each'>
         <img src={podcast.coverImage} alt={podcast.title} className='cover-image'/>
         <p>{podcast.title}</p>
         <p>{podcast.host}</p>
    </div>
  )
}

export default PodcastCard