import React from 'react'
import "./PodcastCard.css"

const PodcastCard = ({podcast}) => {

  return (
    <div onClick={() => (podcast)}>
      <div key={podcast.uuid} className='podcast-each'>
          <img src={podcast.imageUrl} alt={podcast.name} className='cover-image'/>
          <p>{podcast.name}</p>
          <p>{podcast.authorName}</p>
      </div>
    </div>
  )
}

export default PodcastCard