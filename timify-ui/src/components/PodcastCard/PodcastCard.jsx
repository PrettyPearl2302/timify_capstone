import React from 'react'
import "./PodcastCard.css"

const PodcastCard = ({podcast}) => {
  
  return (
    <div key={podcast.uuid} className='podcast-each'>
         <img src={podcast.imageUrl} alt={podcast.name} className='cover-image'/>
         <p>{podcast.name}</p>
         <p>{podcast.authorName}</p>
    </div>
  )
}

export default PodcastCard