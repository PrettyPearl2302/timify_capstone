import React from 'react'
import "./PodcastGrid.css"
import PodcastCard from '../PodcastCard/PodcastCard'

const PodcastGrid = ({podcastsByGenre}) => {

  const genreMapping = {
    PODCASTSERIES_BUSINESS: "Business",
    PODCASTSERIES_COMEDY: "Comedy",
    PODCASTSERIES_HEALTH_AND_FITNESS: "Health and Fitness",
    PODCASTSERIES_NEWS: "News",
    PODCASTSERIES_SOCIETY_AND_CULTURE: "Society and Culture",
    PODCASTSERIES_SPORTS: "Sports"
  };

  return (
    <div className="podcastGrid">
       <h2 className='grid-heading'>Explore These Genres...</h2>
      {podcastsByGenre && Object.entries(podcastsByGenre).map(([genre, podcasts]) => (
        <div key={genre} className="genre-section">
          <h2 className='section-header'>{genreMapping[genre]}</h2>
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
