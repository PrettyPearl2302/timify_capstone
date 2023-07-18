import React, {useContext} from 'react'
import "./PodcastCard.css"
import { PodcastContext } from '../../state/PodcastContext'

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