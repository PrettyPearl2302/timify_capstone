import React from 'react'
import { AiOutlineLoading } from "react-icons/ai"
import "./PodcastGrid.css"
import PodcastCard from '../PodcastCard/PodcastCard'

const PodcastGrid = ({podcastsByGenre}) => {

  console.log(podcastsByGenre)

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
