import React, {Fragment} from 'react'
import './RecGrid.css'
import RecCard from '../RecCard/RecCard'

const RecGrid = ({recPodcasts, refPodcastName}) => {

  return (
 
        <div>
          {recPodcasts.map((podcastArray, index) => (
            <Fragment key={refPodcastName[index]}>
              <h3 className='rec-heading'>Because you liked an episode from {refPodcastName[index]}</h3>
              <div className='podcast-grid'>
                {podcastArray.map((podcast) => (
                  <RecCard key={podcast.uuid} podcast={podcast} />
                ))}
              </div>
            </Fragment>
          ))}
        </div>

)
}


export default RecGrid