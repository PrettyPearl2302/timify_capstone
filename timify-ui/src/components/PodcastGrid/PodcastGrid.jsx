import React, {useContext} from 'react'
import { AiOutlineLoading } from "react-icons/ai"
import "./PodcastGrid.css"
import PodcastCard from '../PodcastCard/PodcastCard'
import { PodcastContext } from '../../state/PodcastContext'

const PodcastGrid = () => {

  const { podcastsByGenre } = useContext(PodcastContext);

  return (
    <div className="podcastGrid">
      {podcastsByGenre && Object.entries(podcastsByGenre).map(([genre, podcasts]) => (
        <div key={genre} className="genre-section">
          <h2>{genre}</h2>
          <div className="podcast-grid">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.uuid} podcast={podcast} />
            ))}
          </div>
        </div>
      ))}
    </div>


  )
}

export default PodcastGrid
