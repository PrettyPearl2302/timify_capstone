import React, {Fragment, useState} from 'react'
import './RecGrid.css'
import RecCard from '../RecCard/RecCard'

const RecGrid = ({recPodcasts, refPodcastName}) => {

    const [iterationIndex, setIterationIndex ] = useState(0)

    const handleLoadMore = () => {
        if (iterationIndex < recPodcasts.length - 1) {
            setIterationIndex(iterationIndex + 1)
        }
    }

  return (
 
        <div>
          {recPodcasts.slice(0, iterationIndex + 1).map((podcastArray, index) => (
            <Fragment key={refPodcastName[index]}>
              <h3 className='rec-heading'>Because you liked an episode from {refPodcastName[index]} :</h3>
              <div className='podcast-grid'>
                {podcastArray.map((podcast) => (
                  <RecCard key={podcast.uuid} podcast={podcast} />
                ))}
              </div>
            </Fragment>
          ))}
          {iterationIndex < recPodcasts.length - 1 ? (
            <button onClick={handleLoadMore} className='load-more-btn'>Load More</button>
          ) : (
            <p>No more podcasts</p>
          )} 
        </div>

)
}


export default RecGrid